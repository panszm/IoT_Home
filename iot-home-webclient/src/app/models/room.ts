import { Device } from './device';
import { Sensor } from './sensor';

export interface Room {
  id: string;
  name: string;
  devices?: Device[];
  sensors?: Sensor[];
}
