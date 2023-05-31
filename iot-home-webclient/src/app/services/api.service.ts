import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { DeviceStatus } from '../models/deviceStatus';
import { SensorMeasurement } from '../models/sensorMeasurement';
import { DeviceModel } from '../models/deviceModel';
import { SensorModel } from '../models/sensorModel';
import { Sensor } from '../models/sensor';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<Location[]> {
    return this.http.get('/api/locations') as Observable<Location[]>;
  }
  getAllDevices(): Observable<Device[]> {
    return this.http.get('/api/devices') as Observable<Device[]>;
  }
  getAllSensors(): Observable<Sensor[]> {
    return this.http.get('/api/sensors') as Observable<Sensor[]>;
  }

  setDeviceRoom(deviceId: string, newRoomId: string) {
    let body = { deviceId: deviceId, newRoomId: newRoomId };
    return this.http.post('/api/device-set-room', body);
  }

  setSensorAssignment(
    sensorId: string,
    newRoomId: string | null,
    newDeviceId: string | null
  ) {
    let body = {
      sensorId: sensorId,
      newRoomId: newRoomId,
      newDeviceId: newDeviceId,
    };
    return this.http.post('/api/sensor-set-assignment', body);
  }

  getDevicesStatuses(): Observable<DeviceStatus[]> {
    return this.http.get('/api/device-statuses') as Observable<DeviceStatus[]>;
  }

  getSensorsMeasurements(): Observable<SensorMeasurement[]> {
    return this.http.get('/api/sensor-measurements') as Observable<
      SensorMeasurement[]
    >;
  }

  setLocationName(id: string, newName: string) {
    let body = { id: id, newName: newName };
    return this.http.post('/api/location-set-name', body);
  }

  setRoomName(id: string, newName: string) {
    let body = { id: id, newName: newName };
    return this.http.post('/api/room-set-name', body);
  }

  setDeviceName(id: string, newName: string) {
    let body = { id: id, newName: newName };
    return this.http.post('/api/device-set-name', body);
  }

  setSensorName(id: string, newName: string) {
    let body = { id: id, newName: newName };
    return this.http.post('/api/sensor-set-name', body);
  }

  createLocation(name: string) {
    let body = { name: name };
    return this.http.put('/api/location-create', body);
  }

  createRoom(name: string, locationId: string) {
    let body = { name: name, locationId: locationId };
    return this.http.put('/api/room-create', body);
  }

  createDevice(name: string, deviceModelId: string, roomId: string) {
    let body = { name: name, device_model_id: deviceModelId, room_id: roomId };
    return this.http.put('/api/device-create', body);
  }

  createSensor(
    name: string,
    sensorModelId: string,
    deviceId: string,
    roomId: string
  ) {
    let body = {
      name: name,
      sensor_model_id: sensorModelId,
      device_id: deviceId,
      room_id: roomId,
    };
    return this.http.put('/api/sensor-create', body);
  }

  getAllDeviceModels(): Observable<DeviceModel[]> {
    return this.http.get('/api/device-models') as Observable<DeviceModel[]>;
  }

  getAllSensorModels(): Observable<SensorModel[]> {
    return this.http.get('/api/sensor-models') as Observable<SensorModel[]>;
  }

  createDeviceModel(name: string, producentName: string, productUrl: string) {
    let body = {
      name: name,
      producent_name: producentName,
      product_url: productUrl,
    };
    return this.http.put('/api/device-model-create', body);
  }

  createSensorModel(
    name: string,
    producentName: string,
    productUrl: string,
    measuredPhenomenom: string,
    measurementUnitShort: string,
    measuredRangeTop: number,
    measuredRangeBottom: number,
    precision: number
  ) {
    let body = {
      name: name,
      producent_name: producentName,
      product_url: productUrl,
      measured_phenomenom: measuredPhenomenom,
      measurement_unit_short: measurementUnitShort,
      measured_range_top: measuredRangeTop,
      measured_range_bottom: measuredRangeBottom,
      precision: precision,
    };
    return this.http.put('/api/sensor-model-create', body);
  }

  deleteLocation(id: string) {
    return this.http.delete('/api/delete-location/' + id);
  }
  deleteRoom(id: string) {
    return this.http.delete('/api/delete-room/' + id);
  }
  deleteDevice(id: string) {
    return this.http.delete('/api/delete-device/' + id);
  }
  deleteSensor(id: string) {
    return this.http.delete('/api/delete-sensor/' + id);
  }
  deleteDeviceModel(id: string) {
    return this.http.delete('/api/delete-device-model/' + id);
  }
  deleteSensorModel(id: string) {
    return this.http.delete('/api/delete-sensor-model/' + id);
  }

  changeDeviceModel(id: string, model_id: string) {
    let body = { id: id, model_id: model_id };
    return this.http.post('/api/change-device-model', body);
  }

  changeSensorModel(id: string, model_id: string) {
    let body = { id: id, model_id: model_id };
    return this.http.post('/api/change-sensor-model', body);
  }

  editDeviceModel(
    id: string,
    name: string,
    producent_name: string,
    product_url: string
  ) {
    let body = {
      id: id,
      name: name,
      producent_name: producent_name,
      product_url: product_url,
    };
    return this.http.post('/api/edit-device-model', body);
  }

  editSensorModel(
    id: string,
    name: string,
    producent_name: string,
    product_url: string,
    measured_phenomenom: string,
    measurement_unit_short: string,
    measured_range_top: number,
    measured_range_bottom: number,
    precision: number
  ) {
    let body = {
      id: id,
      name: name,
      producent_name: producent_name,
      product_url: product_url,
      measured_phenomenom: measured_phenomenom,
      measurement_unit_short: measurement_unit_short,
      measured_range_top: measured_range_top,
      measured_range_bottom: measured_range_bottom,
      precision: precision,
    };
    return this.http.post('/api/edit-sensor-model', body);
  }

  getRoomSensors(roomId: string): Observable<Sensor[]> {
    let params = { room_id: roomId };
    return this.http.get('/api/room-sensors', {
      params: params,
    }) as Observable<Sensor[]>;
  }

  getRoomDevices(roomId: string): Observable<Device[]> {
    let params = { room_id: roomId };
    return this.http.get('/api/room-devices', {
      params: params,
    }) as Observable<Device[]>;
  }

  getDeviceSensors(deviceId: string): Observable<Sensor[]> {
    let params = { device_id: deviceId };
    return this.http.get('/api/device-sensors', {
      params: params,
    }) as Observable<Sensor[]>;
  }
}
