import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceModel } from 'src/app/models/deviceModel';
import { isDevice, isLocation } from 'src/app/utils/typeguards';

@Component({
  selector: 'app-device-details-dialog',
  templateUrl: './device-details-dialog.component.html',
  styleUrls: ['./device-details-dialog.component.scss'],
})
export class DeviceDetailsDialogComponent implements OnInit {
  @Input()
  visible: boolean = false;
  @Input()
  detailsTarget: any;
  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onChangeDetailsTargetName: EventEmitter<string> = new EventEmitter();
  @Output()
  onDelete: EventEmitter<void> = new EventEmitter();
  @Output()
  onChangeDetailsTargetModel: EventEmitter<string> = new EventEmitter();
  @Input()
  device_models: DeviceModel[] = [];

  selectedModelId: string = '';

  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(newVisibleValue: boolean): void {
    this.visibleChange.emit(newVisibleValue);
  }

  onChangeDetailsTargetNameFunc(newName: string | null) {
    if (newName) {
      this.onChangeDetailsTargetName.emit(newName);
    }
  }

  onChangeDetailsTargetModelFunc() {
    if (this.selectedModelId.length) {
      this.onChangeDetailsTargetModel.emit(this.selectedModelId);
    }
  }

  onDeleteClick() {
    this.onDelete.emit();
  }
}
