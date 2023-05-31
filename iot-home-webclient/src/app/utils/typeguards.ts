import { Device } from '../models/device';
import { Location } from '../models/location';
import { Room } from '../models/room';
import { Sensor } from '../models/sensor';

export function isRoom(arg: any): arg is Room {
  return arg && 'id' in arg && 'name' in arg && 'devices' in arg;
}

export function isLocation(arg: any): arg is Location {
  return arg && 'id' in arg && 'name' in arg && 'rooms' in arg;
}

export function isDevice(arg: any): arg is Device {
  return arg && 'id' in arg && 'device_model_id' in arg;
}

export function isSensor(arg: any): arg is Sensor {
  return arg && 'sensor_model_id' in arg;
}
