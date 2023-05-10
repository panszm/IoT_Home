import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ContainerDetailsDialogComponent } from './components/list-view/container-details-dialog/container-details-dialog.component';
import { DeviceDetailsDialogComponent } from './components/list-view/device-details-dialog/device-details-dialog.component';
import { SensorDetailsDialogComponent } from './components/list-view/sensor-details-dialog/sensor-details-dialog.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AddDialogComponent } from './components/list-view/add-dialog/add-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ModelsComponent } from './components/models/models.component';
import { AddModelDialogComponent } from './components/models/add-model-dialog/add-model-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    ListViewComponent,
    ContainerDetailsDialogComponent,
    DeviceDetailsDialogComponent,
    SensorDetailsDialogComponent,
    AddDialogComponent,
    ModelsComponent,
    AddModelDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    DialogModule,
    OverlayPanelModule,
    MatSelectModule,
    InputTextModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
