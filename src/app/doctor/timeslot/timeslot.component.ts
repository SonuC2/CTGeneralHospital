import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css'],
})
export class TimeslotComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  startTime: number[] = [9, 10, 11, 12];
  endTime: number[] = [9, 10, 11, 12];

  ngOnInit(): void {
    this.form = this.fb.group({
      appointmentDate: [],
      startTime: [],
      endTime: [],
    });
  }
  onSubmit() {}
}
