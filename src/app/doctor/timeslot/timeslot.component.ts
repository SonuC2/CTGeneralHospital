import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Timeslot } from 'src/app/entities/timeslot';
import { TimeslotService } from 'src/app/services/timeslot.service';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css'],
})
export class TimeslotComponent implements OnInit {
  form!: FormGroup;
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
    this.form = this.fb.group({
      employeeId: [],
      employeeName: [],
      date: [],
      startTime: [],
      endTime: [],
    });
  }
  onSubmit() {
    this.form.get('employeeId')?.setValue('1');
    this.form.get('employeeName')?.setValue('Dr. John Auguston');
    // console.log("timeslot "+this.form.controls.date.value);
    this.timeslotService.addTimeSlot(this.form.value).subscribe();
    // window.location.reload();
  }
}
