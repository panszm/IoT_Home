import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DeviceModel } from 'src/app/models/deviceModel';
import { DeviceStatus } from 'src/app/models/deviceStatus';
import { Location } from 'src/app/models/location';
import { Room } from 'src/app/models/room';
import { SensorMeasurement } from 'src/app/models/sensorMeasurement';
import { SensorModel } from 'src/app/models/sensorModel';
import { APIService } from 'src/app/services/api.service';
import { DragAndDropService } from 'src/app/services/drag-and-drop.service';
import {
  isDevice,
  isLocation,
  isRoom,
  isSensor,
} from 'src/app/utils/typeguards';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  locations: Location[] = [];

  private _detailsTarget: any;
  public get detailsTarget(): any {
    return this._detailsTarget;
  }
  public set detailsTarget(v: any) {
    this._detailsTarget = v;
    this.isContainerDetailsVisible =
      this.detailsTarget &&
      (isLocation(this.detailsTarget) || isRoom(this.detailsTarget));
    this.isDeviceDetailsVisible =
      this.detailsTarget && isDevice(this.detailsTarget);
    this.isSensorDetailsVisible =
      this.detailsTarget && isSensor(this.detailsTarget);
  }

  isContainerDetailsVisible: boolean = false;
  isDeviceDetailsVisible: boolean = false;
  isSensorDetailsVisible: boolean = false;

  deviceStatuses: DeviceStatus[] = [];
  sensorMeasurements: SensorMeasurement[] = [];
  deviceModels: DeviceModel[] = [];
  sensorModels: SensorModel[] = [];

  isAddDialogVisible: boolean = false;

  constructor(
    private apiService: APIService,
    private dragAndDropService: DragAndDropService
  ) {}

  ngOnInit(): void {
    this.refreshStructure();
  }

  refreshStructure(): void {
    this.apiService.getFullStructure().subscribe((locations) => {
      this.locations = locations;
      this.refreshDeviceStatuses();
      this.refreshSensorMeasurements();
      this.refreshModels();
    });
  }

  refreshDeviceStatuses(): void {
    this.apiService.getDevicesStatuses().subscribe((statuses) => {
      statuses.sort((status) => new Date(status.timestamp).getTime());
      statuses.reverse();
      this.deviceStatuses = statuses;
      this.locations
        .map((location) => location.rooms)
        .flat()
        .map((room) => room.devices)
        .flat()
        .forEach(
          (device) =>
            (device.device_status = this.deviceStatuses.find(
              (status) => status.metadata.device_id == device.id
            ))
        );
    });
  }

  refreshSensorMeasurements(): void {
    this.apiService.getSensorsMeasurements().subscribe((measurements) => {
      measurements.sort((measurement) =>
        new Date(measurement.timestamp).getTime()
      );
      measurements.reverse();
      this.sensorMeasurements = measurements;
      this.locations
        .map((location) => location.rooms)
        .flat()
        .map((room) => room.sensors)
        .flat()
        .concat(
          this.locations
            .map((location) => location.rooms)
            .flat()
            .map((room) => room.devices)
            .flat()
            .map((device) => device.sensors)
            .flat()
        )
        .forEach((sensor) => {
          sensor.latest_measurement = this.sensorMeasurements.find(
            (measurement) => measurement.metadata.sensor_id == sensor.id
          );
        });
    });
  }

  refreshModels() {
    this.apiService
      .getAllDeviceModels()
      .subscribe((models) => (this.deviceModels = models));
    this.apiService
      .getAllSensorModels()
      .subscribe((models) => (this.sensorModels = models));
  }

  onDrag(item: any): void {
    this.dragAndDropService.startDraggingItem(item);
  }

  onRoomDragEnd() {
    const draggedItem = this.dragAndDropService.dropItem();
    const dragTarget = this.dragAndDropService.dragTarget;

    if (isRoom(draggedItem) && isLocation(dragTarget)) {
      this.apiService
        .setRoomLocation(draggedItem.id, dragTarget.id)
        .subscribe((_) => this.refreshStructure());
    }
  }

  onDeviceDragEnd() {
    const draggedItem = this.dragAndDropService.dropItem();
    const dragTarget = this.dragAndDropService.dragTarget;

    if (isDevice(draggedItem) && isRoom(dragTarget)) {
      this.apiService
        .setDeviceRoom(draggedItem.id, dragTarget.id)
        .subscribe((_) => this.refreshStructure());
    }
  }

  onSensorDragEnd() {
    const draggedItem = this.dragAndDropService.dropItem();
    const dragTarget = this.dragAndDropService.dragTarget;

    if (isSensor(draggedItem) && isRoom(dragTarget)) {
      this.apiService
        .setSensorAssignment(draggedItem.id, dragTarget.id, null)
        .subscribe((_) => this.refreshStructure());
    } else if (isSensor(draggedItem) && isDevice(dragTarget)) {
      this.apiService
        .setSensorAssignment(draggedItem.id, null, dragTarget.id)
        .subscribe((_) => this.refreshStructure());
    }
  }

  onDragEnter(target: any) {
    this.dragAndDropService.dragEnter(target);
  }

  setDetailsTarget(target: any) {
    this.detailsTarget = target;
  }

  openAddDialog(): void {
    this.isAddDialogVisible = true;
  }
  closeAddDialog(): void {
    this.isAddDialogVisible = false;
  }

  onChangeDetailsTargetName(newName: string) {
    if (isLocation(this.detailsTarget)) {
      this.apiService
        .setLocationName(this.detailsTarget.id, newName)
        .subscribe((_) => {
          this.refreshStructure();
          this.detailsTarget.name = newName;
        });
    } else if (isRoom(this.detailsTarget)) {
      this.apiService
        .setRoomName(this.detailsTarget.id, newName)
        .subscribe((_) => {
          this.refreshStructure();
          this.detailsTarget.name = newName;
        });
    } else if (isDevice(this.detailsTarget)) {
      this.apiService
        .setDeviceName(this.detailsTarget.id, newName)
        .subscribe((_) => {
          this.refreshStructure();
          this.detailsTarget.name = newName;
        });
    } else if (isSensor(this.detailsTarget)) {
      this.apiService
        .setSensorName(this.detailsTarget.id, newName)
        .subscribe((_) => {
          this.refreshStructure();
          this.detailsTarget.name = newName;
        });
    }
  }

  onDeleteDetailsTarget() {
    if (isLocation(this.detailsTarget)) {
      this.apiService
        .deleteLocation(this.detailsTarget.id)
        .subscribe((_) => this.refreshStructure());
    } else if (isRoom(this.detailsTarget)) {
      this.apiService
        .deleteRoom(this.detailsTarget.id)
        .subscribe((_) => this.refreshStructure());
    } else if (isDevice(this.detailsTarget)) {
      this.apiService
        .deleteDevice(this.detailsTarget.id)
        .subscribe((_) => this.refreshStructure());
    } else if (isSensor(this.detailsTarget)) {
      this.apiService
        .deleteSensor(this.detailsTarget.id)
        .subscribe((_) => this.refreshStructure());
    }
    this.detailsTarget = null;
  }

  onAdd(args: any) {
    if (args.type == 'Location') {
      this.apiService.createLocation(args.name).subscribe((_) => {
        this.refreshStructure();
        this.closeAddDialog();
      });
    } else if (args.type == 'Room') {
      this.apiService
        .createRoom(args.name, args.parentLocationId)
        .subscribe((_) => {
          this.refreshStructure();
          this.closeAddDialog();
        });
    } else if (args.type == 'Device') {
      this.apiService
        .createDevice(args.name, args.modelId, args.parentRoomId)
        .subscribe((_) => {
          this.refreshStructure();
          this.closeAddDialog();
        });
    } else if (args.type == 'Sensor') {
      this.apiService
        .createSensor(
          args.name,
          args.modelId,
          args.parentDeviceId,
          args.parentRoomId
        )
        .subscribe((_) => {
          this.refreshStructure();
          this.closeAddDialog();
        });
    }
  }

  onChangeDetailsTargetModel(model_id: string) {
    if (isDevice(this.detailsTarget)) {
      this.apiService
        .changeDeviceModel(this.detailsTarget.id, model_id)
        .subscribe((_) => {
          this.refreshStructure();
          this.detailsTarget.device_model = this.deviceModels.find(
            (m) => m.id == model_id
          );
        });
    } else if (isSensor(this.detailsTarget)) {
      this.apiService
        .changeSensorModel(this.detailsTarget.id, model_id)
        .subscribe((_) => {
          this.refreshStructure();
          this.detailsTarget.sensor_model = this.sensorModels.find(
            (m) => m.id == model_id
          );
        });
    }
  }
}
