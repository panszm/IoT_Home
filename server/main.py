from fastapi import FastAPI, APIRouter
import mongo_api.getters as mongo_api_getters
import mongo_api.models as models
import mongo_api.setters as mongo_api_setters

app = FastAPI()
prefix_router = APIRouter(prefix="/api")

@prefix_router.get("/")
def hello() -> object:
    return {"Hello": "World"}

@prefix_router.get("/locations")
def get_all_locations() -> list[models.Location]:
    return mongo_api_getters.get_all_locations()

@prefix_router.get("/devices")
def get_all_devices() -> list[models.Device]:
    return mongo_api_getters.get_all_devices()

@prefix_router.get("/sensors")
def get_all_sensors() -> list[models.Sensor]:
    return mongo_api_getters.get_all_sensors()

@prefix_router.post("/device-set-room")
def set_device_room(args: dict):
    mongo_api_setters.update_device_room(args['deviceId'], args['newRoomId'])

@prefix_router.post("/sensor-set-assignment")
def set_sensor_assignment(args: dict):
    mongo_api_setters.update_sensor_assignments(args['sensorId'], args['newRoomId'], args['newDeviceId'])
    
@prefix_router.get("/device-statuses")
def get_all_device_statuses() -> list[models.DeviceStatus] :
    return mongo_api_getters.get_all_device_statuses()

@prefix_router.get("/sensor-measurements")
def get_all_sensor_measurements() -> list[models.SensorMeasurement] :
    return mongo_api_getters.get_all_sensor_measurements()

@prefix_router.post("/location-set-name")
def set_location_name(args: dict):
    mongo_api_setters.update_location_name(args['id'], args['newName'])
    
@prefix_router.post("/room-set-name")
def set_room_name(args: dict):
    mongo_api_setters.update_room_name(args['id'], args['newName'])

@prefix_router.post("/device-set-name")
def set_device_name(args: dict):
    mongo_api_setters.update_device_name(args['id'], args['newName'])

@prefix_router.post("/sensor-set-name")
def set_sensor_name(args: dict):
    mongo_api_setters.update_sensor_name(args['id'], args['newName'])

@prefix_router.put("/location-create")
def create_location(args: dict):
    mongo_api_setters.create_location(args['name'])
    
@prefix_router.put("/room-create")
def create_room(args: dict):
    mongo_api_setters.create_room(args['name'], args['locationId'])

@prefix_router.put("/device-create")
def create_device(args: dict):
    mongo_api_setters.create_device(args['name'], args['device_model_id'], args['room_id'])

@prefix_router.put("/sensor-create")
def create_sensor(args: dict):
    mongo_api_setters.create_sensor(args['name'], args['sensor_model_id'], args['room_id'], args['device_id'])
    
@prefix_router.put("/device-model-create")
def create_device_model(args: dict):
    mongo_api_setters.create_device_model(args['name'], args['producent_name'], args['product_url'])
    
@prefix_router.put("/sensor-model-create")
def create_sensor_model(args: dict):
    mongo_api_setters.create_sensor_model(args['name'], args['producent_name'], args['product_url'], args['measured_phenomenom'], args['measurement_unit_short'], args['measured_range_top'], args['measured_range_bottom'], args['precision'])

@prefix_router.get("/device-models")
def get_all_device_models() -> list[models.DeviceModel]:
    return mongo_api_getters.get_all_device_models()

@prefix_router.get("/sensor-models")
def get_all_sensor_models() -> list[models.SensorModel]:
    return mongo_api_getters.get_all_sensor_models()

@prefix_router.delete("/delete-location/{id}")
def delete_location(id:str):
    mongo_api_setters.delete_location(id)
    
@prefix_router.delete("/delete-room/{id}")
def delete_room(id:str):
    mongo_api_setters.delete_room(id)
    
@prefix_router.delete("/delete-device/{id}")
def delete_device(id:str):
    mongo_api_setters.delete_device(id)
    
@prefix_router.delete("/delete-sensor/{id}")
def delete_sensor(id:str):
    mongo_api_setters.delete_sensor(id)

@prefix_router.delete("/delete-device-model/{id}")
def delete_device_model(id:str):
    mongo_api_setters.delete_device_model(id)
    
@prefix_router.delete("/delete-sensor-model/{id}")
def delete_sensor_model(id:str):
    mongo_api_setters.delete_sensor_model(id)

@prefix_router.post("/change-device-model")
def change_model_of_device(args: dict):
    mongo_api_setters.change_model_of_device(args["id"], args["model_id"])

@prefix_router.post("/change-sensor-model")
def change_model_of_sensor(args: dict):
    mongo_api_setters.change_model_of_sensor(args["id"], args["model_id"])

@prefix_router.post("/edit-device-model")
def edit_device_model(args: dict):
    mongo_api_setters.edit_device_model(args["id"],args["name"],args["producent_name"], args["product_url"])

@prefix_router.post("/edit-sensor-model")
def edit_sensor_model(args: dict):
    mongo_api_setters.edit_sensor_model(args["id"], args["name"], args["producent_name"], args["product_url"], args["measured_phenomenom"], args["measurement_unit_short"], args["measured_range_top"], args["measured_range_bottom"], args["precision"])

@prefix_router.get("/room-sensors")
def get_room_sensors(room_id: str) -> list[models.Sensor]:
    return mongo_api_getters.get_room_sensors(room_id)

@prefix_router.get("/room-devices")
def get_room_devices(room_id: str) -> list[models.Device]:
    return mongo_api_getters.get_room_devices(room_id)

@prefix_router.get("/device-sensors")
def get_device_sensors(device_id: str) -> list[models.Sensor]:
    return mongo_api_getters.get_device_sensors(device_id)

app.include_router(prefix_router)