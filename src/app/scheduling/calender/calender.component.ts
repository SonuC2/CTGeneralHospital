import { Component, OnInit } from '@angular/core';
import {
  DayService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
  EventSettingsModel,
  View,
  WorkHoursModel,
} from '@syncfusion/ej2-angular-schedule';
import { Appointments } from 'src/app/entities/appointments';
import { scheduleData } from './datasource';

@Component({
  selector: 'app-calender',
  providers: [DayService, WorkWeekService, MonthService, MonthAgendaService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  constructor() {}

  schedule!:Appointments[];
  ngOnInit(): void {

     

  }




  //
  // public selectedDate: Date = new Date(2021, 12, 24);
  // public eventSettings: EventSettingsModel = {
  //     dataSource: this.schedule
  // };
  public minDate: Date = new Date;
  public maxDate: Date = new Date(2022, 1, 23);
  public weekFirstDay: number = 1;
  public scheduleHours: WorkHoursModel = {
    highlight: true,
    start: '09:00',
    end: '18:00',
  };
  public workWeekDays: number[] = [1, 2, 3, 4, 5, 6]; //work week days view on calender

  public scheduleViews: View[] = ['Day', 'WorkWeek', 'Month', 'MonthAgenda'];
  public eventSettings: EventSettingsModel = { dataSource: scheduleData };
}
