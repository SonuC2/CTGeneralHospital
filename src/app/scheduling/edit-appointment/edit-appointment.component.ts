import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css'],
})
export class EditAppointmentComponent implements OnInit {
  form!: FormGroup;
  appointmentId!: any;
  appointmentStatus: String = 'Rescheduled';

  constructor(
    private fb: FormBuilder,
    private service: SchedulingService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      specialisation: [],
      physician: [],
      meetingTitle: [],
      description: [],
      appointmentDate: [],
      appointmentTime: [],
      reason: [],
      rescheduleDate: [],
      rescheduleTime: [],
      appointmentStatus: [],
    });
    // this.appointmentTest=this.router.snapshot.paramMap.get("index");
    // console.log(this.appointmentTest)
    this.getAppointmentData();
    this.appointmentId = this.router.snapshot.paramMap.get('index');
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
  physician: string[] = [
    'Dr.John',
    'Dr Bhushan',
    'Dr. Sonu',
    'Dr. Auguston',
    'Dr.Parag',
    'Dr. Priyanka',
    'Dr.Mansi',
  ];
  appointmentTime: string[] = ['9am - 10am', '12pm - 1pm', '3pm-4pm'];
  rescheduleTime: string[] = [
    '10am - 11am',
    '10.30pm - 11pm',
    '3pm-4pm',
    '9am - 10am',
    '12pm - 1pm',
  ];

     //date picker filter
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
     // Prevent Saturday  from being selected.
    return day !== 0 ;
  };

  onSubmit() {
    console.log(this.form.value);
    console.log(this.form.get('id')?.value);
    this.form.get('appointmentStatus')?.setValue('Rescheduled');
    this.service
      .updateAppointment(this.form.value, this.appointmentId)
      .subscribe();
      this.route.navigate(["/scheduling/appointment-list"]);
  }

  getAppointmentData() {
    let data: any = this.location.getState();
    console.log(data);
    this.form.get('specialisation')?.setValue(data.specialisation);
    this.form.get('physician')?.setValue(data.physician);
    this.form.get('meetingTitle')?.setValue(data.meetingTitle);
    this.form.get('description')?.setValue(data.description);
    this.form.get('appointmentDate')?.setValue(data.appointmentDate);
    this.form.get('appointmentTime')?.setValue(data.appointmentTime);
    this.form.get('appointmentStatus')?.setValue(data.appointmentStatus);
  }
}
