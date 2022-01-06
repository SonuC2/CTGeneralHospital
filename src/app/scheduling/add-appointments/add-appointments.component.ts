import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.css'],
})
export class AddAppointmentsComponent implements OnInit {
  hideAddAppointment = true;
  index: number = -1;
  form!: FormGroup;

  constructor(private fb: FormBuilder,private service:SchedulingService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      specialisation: [],
      physician: [],
      meetingTitle: [],
      description: [],
      appointmentDate: [],
      appointmentTime: [],
    });
  }

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  specialisation: string[] = [
    'Neurologists',
    'Radiologists',
    'Anesthesiologists',
    'Psychiatrists',
    'Anesthesiologists',
    'Gynecologists',
  ];
  physician: string[] = ['Dr.John', 'Dr Bhushan', 'Dr. Sonu', 'Dr. Auguston','Dr.Parag','Dr. Priyanka','Dr.Mansi'];
  appointmentTime: string[] = ['9am - 10am', '12pm - 1pm', '3pm-4pm'];
  
  onSubmit() {
    console.log(this.form.value);
    this.service.addAppointment(this.form.value).subscribe();
  }


}
