import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DeviceModel } from 'src/app/models/deviceModel';
import { Location } from 'src/app/models/location';
import { Room } from 'src/app/models/room';
import { SensorModel } from 'src/app/models/sensorModel';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Input()
  fullStructure: Location[] = [];
  @Output()
  onAdd: EventEmitter<any> = new EventEmitter();
  @Input()
  deviceModels: DeviceModel[] = [];
  @Input()
  sensorModels: SensorModel[] = [];

  isParentRoom: boolean = true;
  get rooms(): Room[] {
    return this.fullStructure.map((location) => location.rooms).flat();
  }
  get devices(): Device[] {
    return this.rooms.map((room) => room.devices).flat();
  }

  get isAddButtonDisabled(): boolean {
    return (
      !this.name.length ||
      !this.type.length ||
      ((this.type == 'Device' || this.type == 'Sensor') &&
        (!this.modelId.length ||
          (!this.parentRoomId.length && this.isParentRoom) ||
          (!this.parentDeviceId.length && !this.isParentRoom)))
    );
  }

  types: string[] = ['Location', 'Room', 'Device', 'Sensor'];

  name: string = '';
  type: string = '';
  modelId: string = '';
  parentRoomId: string = '';
  parentDeviceId: string = '';
  parentLocationId: string = '';

  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(newVisibleValue: boolean) {
    this.visibleChange.emit(newVisibleValue);
  }

  onAddClick() {
    this.onAdd.emit({
      name: this.name,
      type: this.type,
      modelId: this.modelId,
      parentRoomId: this.parentRoomId,
      parentDeviceId: this.parentDeviceId,
      parentLocationId: this.parentLocationId,
    });
  }
}
