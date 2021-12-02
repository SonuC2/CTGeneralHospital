import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment/appointment.component';
import {
  MonthService,
  ScheduleModule,
  WeekService,
  View,
} from '@syncfusion/ej2-angular-schedule';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'appointment',
    component: AppointmentComponent,
  },
];

@NgModule({
  declarations: [AppointmentComponent],
  providers: [WeekService, MonthService],
  //declaration of ej2-angular-schedule module into NgModule
  imports: [CommonModule, ScheduleModule, RouterModule.forChild(routes)],
})
export class SchedulingModule {}
