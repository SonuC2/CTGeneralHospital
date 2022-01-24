import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Employee } from 'src/app/entities/employee';
import { Timeslot } from 'src/app/entities/timeslot';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { DatePipe } from '@angular/common';
// import { deprecate } from 'util';
// import { EventEmitter } from 'stream';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
 
export const APP_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
]
  
})
export class TimeslotComponent implements OnInit {
  form!: FormGroup;
  physicianDetailsFromLogin!:Employee;
  @ViewChild(MatDatepicker)
  picker!: MatDatepicker<Moment>;
  constructor(
    private fb: FormBuilder,
    private timeslotService: TimeslotService
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
    this.physicianDetailsFromLogin = JSON.parse(sessionStorage.getItem('physicianDetailsFromLogin') || '{}');
    console.log("PAtient Details from login: ", this.physicianDetailsFromLogin);

    this.form = this.fb.group({
      employeeId: [],
      employeeName: [],
      date: [],
      startTime: [],
      endTime: [],
    });
  }
  onSubmit() {
    this.form.get('employeeId')?.setValue(this.physicianDetailsFromLogin.employeeId);
    this.form.get('employeeName')?.setValue(this.physicianDetailsFromLogin.title + " " + this.physicianDetailsFromLogin.firstName + " " + this.physicianDetailsFromLogin.lastName);
    // console.log("timeslot "+this.form.controls.date.value);
  let selecteddate;
    // this.picker.selectedChanged.subscribe(
    //   (newDate: Moment) => {
    //     // this.isValidMoment = moment.isMoment(newDate);
    //     selecteddate = newDate;
    //   },
    //   (error: string | undefined) => {
    //     throw Error(error);
    //   }
    // );

    // this.picker.dateChange.subscribe((newDate: Moment) => {
    //     // this.isValidMoment = moment.isMoment(newDate);
    //     selecteddate = newDate;
    //   },
    //   (error: string | undefined) => {
    //     throw Error(error);
    //   })
    this.timeslotService.addTimeSlot(this.form.value).subscribe();
    window.location.reload();
  }

  getSelectedDate(event :any){
    const m: Moment = event.value;
    
    // if(m){
    //   console.log("Date selected: " + m.toDate());
    //   console.log(m.format("DD/MM/YYYY"));

    // }
    // const someDate = moment(event.value).format("DD/MM/YYYY");
    // console.log("_____",someDate);
    // let year = m.toObject().years;
    // console.log(year);
    // let month = m.toObject().months + 1;
    // console.log(month)
    // let day = m.toObject().date;
    // console.log(day)
    // let date = day + "/" + month + "/" + year
    // console.log("formatted date using datepipe: ",this.datepipe.transform(date, 'yyyy-MM-dd'))
  //  this.form.get('date')?.setValue(m.format('DD-MM-YYYY'));
  console.log(this.form.get('date')?.value)
  }
}
