export interface DeviceStatus {
  id: string;
  metadata: {
    device_id: string;
  };
  timestamp: Date;
  is_available: boolean;
}
