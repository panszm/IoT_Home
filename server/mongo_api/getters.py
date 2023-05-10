from pymongo import MongoClient
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from constants import *
import database_utils
import models
from general import *

def get_all_locations() -> list[models.Location]:
   items = get_database()[COLLECTION_LOCATIONS].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_rooms() -> list[models.Room]:
   items = get_database()[COLLECTION_ROOMS].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_devices() -> list[models.Device]:
   items = get_database()[COLLECTION_DEVICES].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_full_structure() -> list[models.Location]:
   items = get_database()[COLLECTION_LOCATIONS].aggregate([
      {
         '$lookup': {
               'from': 'Room', 
               'localField': '_id', 
               'foreignField': 'location_id', 
               'pipeline': [
                  {
                     '$match': {
                           'location_id': {
                              '$ne': None
                           }
                     }
                  }
               ], 
               'as': 'rooms'
         }
      }, {
         '$unwind': {
               'path': '$rooms', 
               'preserveNullAndEmptyArrays': True
         }
      }, {
         '$lookup': {
               'from': 'Device', 
               'localField': 'rooms._id', 
               'foreignField': 'room_id', 
               'pipeline': [
                  {
                     '$match': {
                           'room_id': {
                              '$ne': None
                           }
                     }
                  }
               ], 
               'as': 'rooms.devices'
         }
      }, {
         '$unwind': {
               'path': '$rooms.devices', 
               'preserveNullAndEmptyArrays': True
         }
      }, {
         '$lookup': {
               'from': 'DeviceModel', 
               'localField': 'rooms.devices.device_model_id', 
               'foreignField': '_id', 
               'as': 'rooms.devices.device_model'
         }
      }, {
         '$addFields': {
               'rooms.devices.device_model': {
                  '$arrayElemAt': [
                     '$rooms.devices.device_model', 0
                  ]
               }
         }
      }, {
         '$lookup': {
               'from': 'Sensor', 
               'localField': 'rooms.devices._id', 
               'foreignField': 'device_id', 
               'pipeline': [
                  {
                     '$match': {
                           'device_id': {
                              '$ne': None
                           }
                     }
                  }
               ], 
               'as': 'rooms.devices.sensors'
         }
      }, {
         '$unwind': {
               'path': '$rooms.devices.sensors', 
               'preserveNullAndEmptyArrays': True
         }
      }, {
         '$lookup': {
               'from': 'SensorModel', 
               'localField': 'rooms.devices.sensors.sensor_model_id', 
               'foreignField': '_id', 
               'as': 'rooms.devices.sensors.sensor_model'
         }
      }, {
         '$addFields': {
               'rooms.devices.sensors.sensor_model': {
                  '$arrayElemAt': [
                     '$rooms.devices.sensors.sensor_model', 0
                  ]
               }
         }
      }, {
         '$lookup': {
               'from': 'Sensor', 
               'localField': 'rooms._id', 
               'foreignField': 'room_id', 
               'pipeline': [
                  {
                     '$match': {
                           'room_id': {
                              '$ne': None
                           }
                     }
                  }
               ], 
               'as': 'rooms.sensors'
         }
      }, {
         '$unwind': {
               'path': '$rooms.sensors', 
               'preserveNullAndEmptyArrays': True
         }
      }, {
         '$lookup': {
               'from': 'SensorModel', 
               'localField': 'rooms.sensors.sensor_model_id', 
               'foreignField': '_id', 
               'as': 'rooms.sensors.sensor_model'
         }
      }, {
         '$addFields': {
               'rooms.sensors.sensor_model': {
                  '$arrayElemAt': [
                     '$rooms.sensors.sensor_model', 0
                  ]
               }
         }
      }, {
         '$group': {
               '_id': {
                  'location_id': '$_id', 
                  'room_id': '$rooms._id', 
                  'device_id': '$rooms.devices._id'
               }, 
               'name': {
                  '$first': '$name'
               }, 
               'rooms': {
                  '$first': '$rooms'
               }, 
               'device_sensors': {
                  '$addToSet': '$rooms.devices.sensors'
               }
         }
      }, {
         '$group': {
               '_id': {
                  'location_id': '$_id.location_id', 
                  'room_id': '$_id.room_id'
               }, 
               'name': {
                  '$first': '$name'
               }, 
               'rooms': {
                  '$first': '$rooms'
               }, 
               'room_devices': {
                  '$addToSet': {
                     '$cond': {
                           'if': {
                              '$gte': [
                                 '$rooms.devices._id', None
                              ]
                           }, 
                           'then': {
                              '_id': '$rooms.devices._id', 
                              'name': '$rooms.devices.name', 
                              'device_model_id': '$rooms.devices.device_model_id', 
                              'room_id': '$rooms.devices.room_id', 
                              'device_model': '$rooms.devices.device_model', 
                              'sensors': '$device_sensors'
                           }, 
                           'else': {}
                     }
                  }
               }, 
               'room_sensors': {
                  '$addToSet': {
                     '$cond': {
                           'if': {
                              '$gte': [
                                 '$rooms.sensors._id', None
                              ]
                           }, 
                           'then': {
                              '_id': '$rooms.sensors._id', 
                              'name': '$rooms.sensors.name', 
                              'room_id': '$rooms._id', 
                              'sensor_model_id': '$rooms.sensors.sensor_model_id', 
                              'sensor_model': '$rooms.sensors.sensor_model'
                           }, 
                           'else': {}
                     }
                  }
               }
         }
      }, {
         '$group': {
               '_id': {
                  'location_id': '$_id.location_id'
               }, 
               'name': {
                  '$first': '$name'
               }, 
               'rooms': {
                  '$addToSet': {
                     '_id': '$rooms._id', 
                     'location_id': '$rooms.location_id', 
                     'name': '$rooms.name', 
                     'devices': '$room_devices', 
                     'sensors': '$room_sensors'
                  }
               }
         }
      }, {
         '$project': {
               '_id': '$_id.location_id', 
               'name': '$name', 
               'rooms': '$rooms'
         }
      }
   ])
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_device_statuses() -> list[models.DeviceStatus]:
   items = get_database()[COLLECTION_DEVICE_STATUS].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_sensor_measurements() -> list[models.SensorMeasurement]:
   items = get_database()[COLLECTION_SENSOR_MEASUREMENT].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_device_models() -> list[models.DeviceModel]:
   items = get_database()[COLLECTION_DEVICE_MODELS].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_sensor_models() -> list[models.SensorModel]:
   items = get_database()[COLLECTION_SENSOR_MODELS].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

if __name__ == "__main__":   
   dbname = get_full_structure()
   RAWOut = open(1, 'w', encoding='utf8', closefd=False)
   print(*dbname, file=RAWOut)
   RAWOut.flush()
   RAWOut.close()
