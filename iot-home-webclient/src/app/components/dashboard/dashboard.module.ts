import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent, DashboardOverviewComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [DashboardComponent],
  bootstrap: [],
})
export class DashboardModule {}
