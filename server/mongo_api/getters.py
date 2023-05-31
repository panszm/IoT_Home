import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from constants import *
import database_utils
import models
from general import *
from bson import ObjectId

def get_all_locations() -> list[models.Location]:
   items = get_database()[COLLECTION_LOCATIONS].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_devices() -> list[models.Device]:
   items = get_database()[COLLECTION_DEVICES].find()
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_all_sensors() -> list[models.Sensor]:
   items = get_database()[COLLECTION_SENSORS].find()
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

def get_room_sensors(room_id: str):
   query = { "room_id": ObjectId(room_id) }
   items = get_database()[COLLECTION_SENSORS].find(query)
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_device_sensors(device_id: str):
   query = { "device_id": ObjectId(device_id) }
   items = get_database()[COLLECTION_SENSORS].find(query)
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

def get_room_devices(room_id: str):
   query = { "room_id": ObjectId(room_id) }
   items = get_database()[COLLECTION_DEVICES].find(query)
   return database_utils.remap_all_id_fields_and_clear_empty_list(list(items))

if __name__ == "__main__":   
   pass
   dbname = get_all_locations()
   RAWOut = open(1, 'w', encoding='utf8', closefd=False)
   print(*dbname, file=RAWOut)
   RAWOut.flush()
   RAWOut.close()
