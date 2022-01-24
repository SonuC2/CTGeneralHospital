import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css'],
})
export class EditAppointmentComponent implements OnInit {
  form!: FormGroup;
  appointmentId!: any;
  // appointmentStatus: String = 'Rescheduled';

  constructor(
    private fb: FormBuilder,
    private service: SchedulingService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      meetingTitle: [],
      description: [],
      specialisation: [],
      employeeId: [],
      employeeName: [],
      appointmentDate: [],
      timeSlot: [],
      reason: [],
      rescheduleDate: [],
      rescheduleTimeSlot: [],
      patientId: [],
      patientName: [],
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
  employeeName: string[] = [
    'Dr.John',
    'Dr Bhushan',
    'Dr. Sonu',
    'Dr. Auguston',
    'Dr.Parag',
    'Dr. Priyanka',
    'Dr.Mansi',
  ];
  timeSlot: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rescheduleTimeSlot:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  //date picker filter
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday  from being selected.
    return day !== 0;
  };

  onSubmit() {
    let ob = this.form.value;
    // console.log(this.form.get('appointmentId')?.value);
    console.log(this.appointmentId)
    this.form.get('appointmentStatus')?.setValue('Rescheduled');
    console.log(this.form.value);
    this.service.updateAppointment( ob).subscribe();
    this.route.navigate(['/scheduling/appointment-list']);
  }

  getAppointmentData() {
    let data: any= this.location.getState();
    console.log("edit list"+data.timeSlot);
    this.form.get('specialisation')?.setValue(data.specialisation);
    this.form.get('employeeName')?.setValue(data.employeeName);
    this.form.get('meetingTitle')?.setValue(data.meetingTitle);
    this.form.get('description')?.setValue(data.description);
    this.form.get('appointmentDate')?.setValue(data.appointmentDate);
    this.form.get('timeSlot')?.setValue(data.timeSlot);
    this.form.get('appointmentStatus')?.setValue(data.appointmentStatus);
  }
}
