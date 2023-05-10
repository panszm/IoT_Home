import { DeviceModel } from './deviceModel';
import { DeviceStatus } from './deviceStatus';
import { Sensor } from './sensor';

export interface Device {
  id: string;
  device_model_id: string;
  roomId: string;
  name: string;
  device_model: DeviceModel;
  sensors: Sensor[];
  device_status?: DeviceStatus;
}
