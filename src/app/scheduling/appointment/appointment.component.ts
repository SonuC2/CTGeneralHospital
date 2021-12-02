import { Component, OnInit } from '@angular/core';
import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService,
  EventSettingsModel,
} from '@syncfusion/ej2-angular-schedule';
import { defaultData } from './datasource';

@Component({
  selector: 'app-appointment',
  // templateUrl: './appointment.component.html',
  template: `<ejs-schedule
    width="100%"
    height="550px"
    [selectedDate]="selectedDate"
    [eventSettings]="eventSettings"
    ><e-views>
      
      <e-view option="WorkWeek" startHour="10:00" endHour="16:00"></e-view>
      <e-view option="Month" [showWeekend]="showWeekend"></e-view></e-views
  ></ejs-schedule>`,
  styleUrls: ['./appointment.component.css'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
  ],
})
export class AppointmentComponent implements OnInit {
  constructor() {}

  public selectedDate: Date = new Date(2021, 12);
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = { dataSource: defaultData };

  ngOnInit(): void {}
}
