import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { TimeslotService } from 'src/app/services/timeslot.service';

@Component({
  selector: 'app-edit-timeslot',
  templateUrl: './edit-timeslot.component.html',
  styleUrls: ['./edit-timeslot.component.css'],
})
export class EditTimeslotComponent implements OnInit {
  form!: FormGroup;
  slotId!: any;

  constructor(
    private fb: FormBuilder,
    private timeslotService: TimeslotService,
    private location: Location,
    private router: ActivatedRoute
  ) {}
  @ViewChild(MatAccordion) accordion!: MatAccordion;

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
    this.getAppointmentData();
    this.slotId = this.router.snapshot.paramMap.get('index');
  }

  getAppointmentData() {
    let data: any = this.location.getState();
    console.log('edit timeSlot list' + data.slotId);
    this.form.get('date')?.setValue(data.date);
    this.form.get('startTime')?.setValue(data.startTime);
    this.form.get('endTime')?.setValue(data.endTime);
  }

  onSubmit() {
    let ob = this.form.value;

    console.log(this.slotId);
    console.log(this.form.value);
    // this.timeslotService.updateTimeSlot(ob).subscribe();
    window.location.reload();
  }
}
