export interface SensorMeasurement {
  id: string;
  metadata: {
    sensor_id: string;
  };
  timestamp: Date;
  measurement_value: number;
}
