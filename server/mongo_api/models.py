from pydantic import BaseModel
from datetime import datetime

class DeviceStatus(BaseModel):
    id: str
    metadata: object
    is_available: bool
    timestamp: datetime

class SensorMeasurement(BaseModel):
    id: str
    metadata: object
    measurement_value: float
    timestamp: datetime

class SensorModel(BaseModel):
    id: str
    name: str
    producent_name: str
    product_url: str
    measured_phenomenom: str
    measurement_unit_short: str
    measured_range_top: float
    measured_range_bottom: float
    precision: float

class Sensor(BaseModel):
    id: str
    name: str
    device_id: str | None
    room_id: str | None
    sensor_model_id: str
    sensor_model: SensorModel | None

class DeviceModel(BaseModel):
    id: str
    name: str
    producent_name: str
    product_url: str

class Device(BaseModel):
    id: str
    name: str
    device_model_id: str
    device_model: DeviceModel | None
    room_id: str
    sensors: list[Sensor] | None

class Room(BaseModel):
    id: str
    location_id: str
    name: str
    devices: list[Device] | None
    sensors: list[Sensor] | None

class Location(BaseModel):
    id: str
    name: str
    rooms: list[Room] | None
