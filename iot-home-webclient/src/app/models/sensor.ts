import { SensorMeasurement } from './sensorMeasurement';
import { SensorModel } from './sensorModel';

export interface Sensor {
  id: string;
  device_id: string;
  sensor_model_id: string;
  name: string;
  sensor_model: SensorModel;
  latest_measurement?: SensorMeasurement;
}
