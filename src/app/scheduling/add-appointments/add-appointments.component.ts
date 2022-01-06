import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
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
  appointmentData: Appointments[]=[];
  appointmentTest:any;

  constructor(private fb: FormBuilder,private service:SchedulingService ,
    private route:Router, private router: ActivatedRoute, private location:Location) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      specialisation: [],
      physician: [],
      meetingTitle: [],
      description: [],
      appointmentDate: [],
      appointmentTime: [],
      appointmentStatus:[]
    });
    // this.appointmentTest=this.router.snapshot.paramMap.get("index");
    // console.log(this.appointmentTest)
    
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
    this.form.get("appointmentStatus")?.setValue("Booked");
  }

  
  
}
