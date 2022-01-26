import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Employee } from 'src/app/entities/employee';
import { Timeslot } from 'src/app/entities/timeslot';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { DatePipe } from '@angular/common';

import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css'],
  // providers: [
  //   { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
  //   { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  // ]
})
export class TimeslotComponent implements OnInit {
  form!: FormGroup;
  physicianDetailsFromLogin!: Employee;
  dateToDB!: string;

  // @ViewChild(MatDatepicker)
  // picker!: MatDatepicker<Moment>;
  constructor(
    private fb: FormBuilder,
    private timeslotService: TimeslotService,
    public dialog: MatDialog
  ) {}

  startTime: String[] = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
  ];
  endTime: String[] = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
  ];

  ngOnInit(): void {
    this.physicianDetailsFromLogin = JSON.parse(
      sessionStorage.getItem('physicianDetailsFromLogin') || '{}'
    );
    console.log('PAtient Details from login: ', this.physicianDetailsFromLogin);

    this.form = this.fb.group({
      slotId: [],
      employeeId: [],
      employeeName: [],
      date: [],
      startTime: [],
      endTime: [],
    });
  }
  onSubmit() {
    this.form.get('employeeId')?.setValue(this.physicianDetailsFromLogin.employeeId);
    this.form.get('employeeName')?.setValue(this.physicianDetailsFromLogin.title + ' ' + this.physicianDetailsFromLogin.firstName + ' ' + this.physicianDetailsFromLogin.lastName);
    
    let selecteddate = this.form.get('date')?.value;
    console.log(selecteddate);
    this.dateToDB = moment(selecteddate).format('YYYY-MM-DD');
    // console.log("Slot Date Formate"+this.dateToDB);
    this.form.get('date')?.setValue(this.dateToDB);
    this.timeslotService.addTimeSlot(this.form.value).subscribe();
    // window.location.reload();
  }

  getSelectedDate(event: any) {
    console.log(this.form.get('date')?.value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      window.location.reload();
    });
  }
}
