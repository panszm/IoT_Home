import { Component, OnInit } from '@angular/core';
import { DeviceModel } from 'src/app/models/deviceModel';
import { SensorModel } from 'src/app/models/sensorModel';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent implements OnInit {
  deviceModels: DeviceModel[] = [];
  sensorModels: SensorModel[] = [];
  edittedDeviceModel: DeviceModel | null = null;
  edittedSensorModel: SensorModel | null = null;
  JSON = JSON;

  isAddDialogVisible: boolean = false;

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.refreshModels();
  }

  openAddDialog(): void {
    this.isAddDialogVisible = true;
  }
  closeAddDialog(): void {
    this.isAddDialogVisible = false;
  }

  refreshModels() {
    this.apiService
      .getAllDeviceModels()
      .subscribe((models) => (this.deviceModels = models));
    this.apiService
      .getAllSensorModels()
      .subscribe((models) => (this.sensorModels = models));
  }

  onAdd(args: any) {
    if (args.type == 'DeviceModel') {
      this.apiService
        .createDeviceModel(args.name, args.producent_name, args.product_url)
        .subscribe((_) => {
          this.refreshModels();
          this.closeAddDialog();
        });
    } else if (args.type == 'SensorModel') {
      this.apiService
        .createSensorModel(
          args.name,
          args.producent_name,
          args.product_url,
          args.measured_phenomenom,
          args.measurement_unit_short,
          args.measured_range_top,
          args.measured_range_bottom,
          args.precision
        )
        .subscribe((_) => {
          this.refreshModels();
          this.closeAddDialog();
        });
    }
  }

  onDeleteDeviceModel(model: DeviceModel) {
    this.apiService
      .deleteDeviceModel(model.id)
      .subscribe((_) => this.refreshModels());
  }

  onDeleteSensorModel(model: SensorModel) {
    this.apiService
      .deleteSensorModel(model.id)
      .subscribe((_) => this.refreshModels());
  }

  setEdittedDeviceModel(model: DeviceModel) {
    this.edittedDeviceModel = JSON.parse(JSON.stringify(model));
  }
  setEdittedSensorModel(model: SensorModel) {
    this.edittedSensorModel = JSON.parse(JSON.stringify(model));
  }

  onDeviceModelEdit() {
    if (this.edittedDeviceModel) {
      this.apiService
        .editDeviceModel(
          this.edittedDeviceModel?.id,
          this.edittedDeviceModel?.name,
          this.edittedDeviceModel?.producent_name,
          this.edittedDeviceModel?.product_url
        )
        .subscribe((_) => this.refreshModels());
    }
  }
  onSensorModelEdit() {
    if (this.edittedSensorModel) {
      this.apiService
        .editSensorModel(
          this.edittedSensorModel?.id,
          this.edittedSensorModel?.name,
          this.edittedSensorModel?.producent_name,
          this.edittedSensorModel?.product_url,
          this.edittedSensorModel.measured_phenomenom,
          this.edittedSensorModel.measurement_unit_short,
          this.edittedSensorModel.measured_range_top,
          this.edittedSensorModel.measured_range_bottom,
          this.edittedSensorModel.precision
        )
        .subscribe((_) => this.refreshModels());
    }
  }
}
