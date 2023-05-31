import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DeviceStatus } from 'src/app/models/deviceStatus';
import { Location } from 'src/app/models/location';
import { Room } from 'src/app/models/room';
import { Sensor } from 'src/app/models/sensor';
import { SensorMeasurement } from 'src/app/models/sensorMeasurement';
import { SensorModel } from 'src/app/models/sensorModel';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements OnInit {
  deviceStatuses: DeviceStatus[] = [];
  devices: Device[] = [];
  devicesUnavailable: Device[] = [];
  rooms: Room[] = [];
  sensorMeasurements: SensorMeasurement[] = [];
  sensors: Sensor[] = [];
  sensorsWithEdgeValue: Sensor[] = [];

  private _locations: Location[] = [];
  public get locations(): Location[] {
    return this._locations;
  }
  public set locations(v: Location[]) {
    this._locations = v;
    this.rooms = v.map((location) => location.rooms).flat();
  }

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.apiService
      .getAllLocations()
      .subscribe((locations) => (this.locations = locations));
    this.apiService.getAllDevices().subscribe((devices) => {
      this.devices = devices;
      this.refreshDeviceStatuses();
    });
    this.apiService.getAllSensors().subscribe((sensors) => {
      this.sensors = sensors;
      this.apiService.getAllSensorModels().subscribe((models) => {
        this.sensors.forEach((sensor) => {
          const foundModel = models.find(
            (model) => model.id == sensor.sensor_model_id
          );
          if (foundModel) {
            sensor.sensor_model = foundModel;
          }
        });
        this.refreshSensorMeasurements();
      });
    });
  }

  refreshDeviceStatuses(): void {
    this.apiService.getDevicesStatuses().subscribe((statuses) => {
      statuses.sort((status) => new Date(status.timestamp).getTime());
      statuses.reverse();
      this.deviceStatuses = statuses;
      this.devices.forEach(
        (device) =>
          (device.device_status = this.deviceStatuses.find(
            (status) => status.metadata.device_id == device.id
          ))
      );
      this.devicesUnavailable = this.devices.filter(
        (device) => !device.device_status?.is_available
      );
    });
  }

  refreshSensorMeasurements(): void {
    this.apiService.getSensorsMeasurements().subscribe((measurements) => {
      measurements.sort((measurement) =>
        new Date(measurement.timestamp).getTime()
      );
      measurements.reverse();
      console.log(measurements, this.sensors);

      this.sensorMeasurements = measurements;
      this.sensors.forEach((sensor) => {
        sensor.latest_measurement = this.sensorMeasurements.find(
          (measurement) => measurement.metadata.sensor_id == sensor.id
        );
      });
      this.sensorsWithEdgeValue = this.sensors.filter(
        (sensor) =>
          sensor.latest_measurement &&
          (sensor.latest_measurement?.measurement_value ==
            sensor.sensor_model.measured_range_bottom ||
            sensor.latest_measurement?.measurement_value ==
              sensor.sensor_model.measured_range_top)
      );
    });
  }
}
