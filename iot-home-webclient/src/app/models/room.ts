import { Device } from './device';
import { Sensor } from './sensor';

export interface Room {
  id: string;
  location_id: string;
  name: string;
  devices: Device[];
  sensors: Sensor[];
}
