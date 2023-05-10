import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import credentials
import urllib 


DATABASE_CONNECTION_STRING = f"mongodb://{credentials.DATABASE_USERNAME}:{urllib.parse.quote(credentials.DATABASE_PASSWORD)}@192.168.31.220:27017/?authMechanism=DEFAULT"
DATABASE_NAME = "IOT_Home"

COLLECTION_LOCATIONS = "Location"
COLLECTION_ROOMS = "Room"
COLLECTION_DEVICES = "Device"
COLLECTION_DEVICE_MODELS = "DeviceModel"
COLLECTION_SENSORS = "Sensor"
COLLECTION_SENSOR_MODELS = "SensorModel"
COLLECTION_DEVICE_STATUS = "DeviceStatus"
COLLECTION_SENSOR_MEASUREMENT = "SensorMeasurement"

ID_KEY = "_id"
ID_KEY_TRANSFORMED = "id"