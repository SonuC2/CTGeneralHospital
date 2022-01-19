import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { Timeslot } from 'src/app/entities/timeslot';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { TimeslotService } from 'src/app/services/timeslot.service';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.css'],
})
export class AddAppointmentsComponent implements OnInit {
  hideAddAppointment = true;
  index: number = -1;
  form!: FormGroup;
  appointmentData: Appointments[] = [];
  appointmentTest: any;
  isNurse:boolean=false;
  isPatient:boolean=true;
  isPhysician:boolean=false;
  timeSlotData:Timeslot[]=[];
  patientDetailsFromLogin!:PatientRegistration;

  constructor(
    private fb: FormBuilder,
    private service: SchedulingService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private timeSlotService: TimeslotService
  ) {}

  ngOnInit(): void {

    this.patientDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
    console.log("PAtient Details from login: ", this.patientDetailsFromLogin);
    
    this.form = this.fb.group({
      meetingTitle!:[],
      description!: [],
      specialisation!: [],
      employeeId!:[3],
      employeeName!:['Dr. Desai'],
      appointmentDate!:[],
      timeSlot!: [],
      reason!:[],
      rescheduleDate!:[],
      rescheduleTimeSlot!:[],
      patientId!:[],
      patientName!:[],
      appointmentStatus!:[]
    });
    let name=this.patientDetailsFromLogin.firstName+" "+this.patientDetailsFromLogin.lastName;
    this.form.get('patientId')?.setValue(this.patientDetailsFromLogin.patientId);
    this.form.get('patientName')?.setValue(name);
    // this.appointmentTest=this.router.snapshot.paramMap.get("index");
    // console.log(this.appointmentTest)
    // this.form.get('employeeId')?.setValue('1');
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
  patientName:String[]=['Alex Hanry','Fader J','Rocky RRR','Alu Arjun','Ram Charan','NTR King',];
  timeSlot: number[] = [1,2,3,4,5,6,7,8];
  patientId:number[]=[101,102,103,104,104,105];
  onSubmit() {
    console.log(this.form.value);
    
    // this.form.get('employeeName')?.setValue('Dr. John Auguston');
    this.form.get('appointmentStatus')?.setValue('Requested');
    this.service.addAppointment(this.form.value).subscribe();
    this.route.navigate(["/scheduling/appointment-list"]);
  }

  //date picker filter
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0;
  };

  loadTimeSlot(){
    console.log(this.form.get('employeeId')?.value);
    console.log(this.form.get('appointmentDate')?.value);
    this.timeSlotService.getTimeSlotByDoctorIdAndDate(this.form.get('employeeId')?.value,this.form.get('appointmentDate')?.value).subscribe(res=>{
      this.timeSlotData= res;
      console.log(this.timeSlotData);
    }
      )
  }
}
