import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SensorModel } from 'src/app/models/sensorModel';
import { isLocation } from 'src/app/utils/typeguards';

@Component({
  selector: 'app-sensor-details-dialog',
  templateUrl: './sensor-details-dialog.component.html',
  styleUrls: ['./sensor-details-dialog.component.scss'],
})
export class SensorDetailsDialogComponent implements OnInit {
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
  sensor_models: SensorModel[] = [];

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
