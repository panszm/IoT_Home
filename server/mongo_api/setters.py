from bson import ObjectId
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from constants import *
from general import *
import database_utils
import uuid
import random
import string

def update_device_room(device_id: str, new_room_id: str):
    query = { "_id": ObjectId(device_id) }
    new_values = { "$set": { "room_id": ObjectId(new_room_id) } }
    get_database()[COLLECTION_DEVICES].update_one(query, new_values)

def update_sensor_assignments(sensor_id: str, new_room_id: str, new_device_id: str):
    query = { "_id": ObjectId(sensor_id) }
    new_values = { "$set": { ("room_id" if new_room_id is not None else "device_id"): ObjectId((new_room_id if new_room_id is not None else new_device_id)), }, "$unset": { ("device_id" if new_room_id is not None else "room_id"): ""}}
    get_database()[COLLECTION_SENSORS].update_one(query, new_values)

def update_location_name(id: str, new_name: str):
    query = { "_id": ObjectId(id) }
    new_values = { "$set": { "name": new_name}}
    get_database()[COLLECTION_LOCATIONS].update_one(query, new_values)

def update_room_name(id: str, new_name: str):
    query = { "rooms._id": ObjectId(id)}
    new_values = { "$set": { "rooms.$.name": new_name}}
    get_database()[COLLECTION_LOCATIONS].update_one(query, new_values)

def update_device_name(id: str, new_name: str):
    query = { "_id": ObjectId(id) }
    new_values = { "$set": { "name": new_name}}
    get_database()[COLLECTION_DEVICES].update_one(query, new_values)

def update_sensor_name(id: str, new_name: str):
    query = { "_id": ObjectId(id) }
    new_values = { "$set": { "name": new_name}}
    get_database()[COLLECTION_SENSORS].update_one(query, new_values)

def create_location(name: str):
    item = { "name": name }
    get_database()[COLLECTION_LOCATIONS].insert_one(item)
    
def create_room(name: str, location_id: str):
    item = {"_id": ObjectId(), "name": name }
    query = { "_id": ObjectId(location_id)}
    update_query = {"$push": {"rooms": item}}
    get_database()[COLLECTION_LOCATIONS].update_one(query, update_query)
    
def create_device(name: str, device_model_id: str, room_id: str):
    item = { "name": name, "device_model_id": ObjectId(device_model_id), "room_id": ObjectId(room_id) }
    get_database()[COLLECTION_DEVICES].insert_one(item)

def create_sensor(name: str, sensor_model_id: str, room_id: str, device_id: str):
    if(len(room_id)):
        item = { "name": name, "sensor_model_id": ObjectId(sensor_model_id), "room_id": ObjectId(room_id) }
    else:
        item = { "name": name, "sensor_model_id": ObjectId(sensor_model_id), "device_id": ObjectId(device_id) }
    get_database()[COLLECTION_SENSORS].insert_one(item)

def create_device_model(name: str, producent_name: str, product_url: str):
    item = { "name": name, "producent_name": producent_name, "product_url": product_url }
    get_database()[COLLECTION_DEVICE_MODELS].insert_one(item)

def create_sensor_model(name: str, producent_name: str, product_url: str, measured_phenomenom: str, measurement_unit_short: str, measured_range_top: float, measured_range_bottom: float, precision: float):
    item = { "name": name, "producent_name": producent_name, "product_url": product_url, "measured_phenomenom":measured_phenomenom, "measurement_unit_short": measurement_unit_short, "measured_range_top": measured_range_top, "measured_range_bottom": measured_range_bottom, "precision": precision }
    get_database()[COLLECTION_SENSOR_MODELS].insert_one(item)

def delete_location(id: str):
    query = { "_id": ObjectId(id) }
    get_database()[COLLECTION_LOCATIONS].delete_one(query)

def delete_room(id: str):
    query = { "_id": ObjectId(id) }
    get_database()[COLLECTION_ROOMS].delete_one(query)
    
def delete_device(id: str):
    query = { "_id": ObjectId(id) }
    get_database()[COLLECTION_DEVICES].delete_one(query)

def delete_sensor(id: str):
    query = { "_id": ObjectId(id) }
    get_database()[COLLECTION_SENSORS].delete_one(query)
    
def delete_device_model(id: str):
    query = { "_id": ObjectId(id) }
    get_database()[COLLECTION_DEVICE_MODELS].delete_one(query)

def delete_sensor_model(id: str):
    query = { "_id": ObjectId(id) }
    get_database()[COLLECTION_SENSOR_MODELS].delete_one(query)

def change_model_of_device(id: str, model_id: str):
    query = { "_id": ObjectId(id) }
    new_values = { "$set": { "device_model_id": ObjectId(model_id)}}
    get_database()[COLLECTION_DEVICES].update_one(query, new_values)

def change_model_of_sensor(id: str, model_id: str):
    query = { "_id": ObjectId(id) }
    new_values = { "$set": { "sensor_model_id": ObjectId(model_id)}}
    get_database()[COLLECTION_SENSORS].update_one(query, new_values)

def edit_device_model(id: str, name: str, producent_name: str, product_url: str):
    query = { "_id": ObjectId(id) }
    vals = {}
    if name is not None:
        vals["name"] = name
    if producent_name is not None:
        vals["producent_name"] = producent_name
    if product_url is not None:
        vals["product_url"] = product_url
    new_values = { "$set": vals}
    get_database()[COLLECTION_DEVICE_MODELS].update_one(query, new_values)
    
def edit_sensor_model(id: str, name: str, producent_name: str, product_url: str, measured_phenomenom: str, measurement_unit_short: str, measured_range_top: float, measured_range_bottom: float, precision: float):
    query = { "_id": ObjectId(id) }
    vals = {}
    if name is not None:
        vals["name"] = name
    if producent_name is not None:
        vals["producent_name"] = producent_name
    if product_url is not None:
        vals["product_url"] = product_url
    if measured_phenomenom is not None:
        vals["measured_phenomenom"] = measured_phenomenom
    if measurement_unit_short is not None:
        vals["measurement_unit_short"] = measurement_unit_short
    if measured_range_top is not None:
        vals["measured_range_top"] = measured_range_top
    if measured_range_bottom is not None:
        vals["measured_range_bottom"] = measured_range_bottom
    if precision is not None:
        vals["precision"] = precision
    new_values = { "$set": vals}
    get_database()[COLLECTION_SENSOR_MODELS].update_one(query, new_values)

if __name__ == "__main__":   
#    update_sensor_assignments("645257fff032697127623cfe", None, "645243caf032697127623cee")
    # update_room_name("6451644a55b67e20fc32cc99", "TestKuchnia")
    create_room("TestRoom","6453c2b77555eb7499217eb6")