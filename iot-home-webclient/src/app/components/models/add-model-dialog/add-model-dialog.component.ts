import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from 'src/app/models/device';
import { DeviceModel } from 'src/app/models/deviceModel';
import { Location } from 'src/app/models/location';
import { Room } from 'src/app/models/room';
import { SensorModel } from 'src/app/models/sensorModel';

@Component({
  selector: 'app-add-model-dialog',
  templateUrl: './add-model-dialog.component.html',
  styleUrls: ['./add-model-dialog.component.scss'],
})
export class AddModelDialogComponent implements OnInit {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onAdd: EventEmitter<any> = new EventEmitter();
  @Input()
  deviceModels: DeviceModel[] = [];
  @Input()
  sensorModels: SensorModel[] = [];

  get isAddButtonDisabled(): boolean {
    return (
      !this.name.length ||
      !this.type.length ||
      !this.producent_name.length ||
      !this.product_url.length ||
      (this.type == 'SensorModel' &&
        (!this.measured_phenomenom.length ||
          !this.measurement_unit_short.length ||
          !_isNumberValue(this.measured_range_top) ||
          !_isNumberValue(this.measured_range_bottom) ||
          !_isNumberValue(this.precision)))
    );
  }

  types: string[] = ['DeviceModel', 'SensorModel'];

  name: string = '';
  type: string = '';
  producent_name: string = '';
  product_url: string = '';
  measured_phenomenom: string = '';
  measurement_unit_short: string = '';
  measured_range_top: number = 0;
  measured_range_bottom: number = 0;
  precision = 0;

  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(newVisibleValue: boolean) {
    this.visibleChange.emit(newVisibleValue);
  }

  onAddClick() {
    this.onAdd.emit({
      name: this.name,
      type: this.type,
      producent_name: this.producent_name,
      product_url: this.product_url,
      measured_phenomenom: this.measured_phenomenom,
      measurement_unit_short: this.measurement_unit_short,
      measured_range_top: this.measured_range_top,
      measured_range_bottom: this.measured_range_bottom,
      precision: this.precision,
    });
  }
}
