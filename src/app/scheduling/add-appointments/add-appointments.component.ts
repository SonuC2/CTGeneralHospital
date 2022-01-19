import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Appointments } from 'src/app/entities/appointments';
import { Employee } from 'src/app/entities/employee';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { Timeslot } from 'src/app/entities/timeslot';
import { User } from 'src/app/entities/user';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
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
  isPatient:boolean=false;
  isPhysician:boolean=true;
  timeSlotData:Timeslot[]=[];
  userDetailsFromLogin!:User;
  physicianDetailsFromLogin!:Employee;
  patients !: PatientRegistration[];
  patientName!:string;
  employeeDetails!:Employee[];

  constructor(
    private fb: FormBuilder,
    private service: SchedulingService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private timeSlotService: TimeslotService,
    private patientRegService : PatientRegistrationService,
    private employeeService:EmployeeService
  ) {}

  ngOnInit(): void {

    this.userDetailsFromLogin = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    console.log("User Details from login: ", this.userDetailsFromLogin);

    if(this.userDetailsFromLogin.userRoleId.roleType === "Physician"){
      this.physicianDetailsFromLogin = JSON.parse(sessionStorage.getItem('physicianDetailsFromLogin') || '{}');
      console.log("Physician Details from login: ", this.physicianDetailsFromLogin);
      this.isPhysician =true;
      this.isPatient = false;
      this.isNurse =false;

      this.patientRegService.getAllPatientList().subscribe(patients =>{
        this.patients = patients;
        console.log("Allpatient list: ", this.patients)
      })
    }
    if(this.userDetailsFromLogin.userRoleId.roleType === "Nurse"){
      this.physicianDetailsFromLogin = JSON.parse(sessionStorage.getItem('nurseDetailsFromLogin') || '{}');
      console.log("Nurse Details from login: ", this.physicianDetailsFromLogin);
      this.isPhysician =false;
      this.isPatient = false;
      this.isNurse =true;

      this.patientRegService.getAllPatientList().subscribe(patients =>{
        this.patients = patients;
        console.log("Allpatient list: ", this.patients)
      })
    }

    if(this.userDetailsFromLogin.userRoleId.roleType === "Patient"){
      this.physicianDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
      console.log("PAtient Details from login: ", this.physicianDetailsFromLogin);
      this.isPhysician =false;
      this.isPatient = true;
      this.isNurse =false;
    }

    this.form = this.fb.group({
      meetingTitle!:[],
      description!: [],
      specialisation!: [],
      employeeId!:[],
      employeeName!:[],
      appointmentDate!:[],
      timeSlot!: [],
      reason!:[],
      rescheduleDate!:[],
      rescheduleTimeSlot!:[],
      patientId!:[],
      patientName!:[],
      appointmentStatus!:[]
    });
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
    'Dermatologists',
    'Cardiologists'

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
  // patientName:String[]=['Alex Hanry','Fader J','Rocky RRR','Alu Arjun','Ram Charan','NTR King',];
  timeSlot: number[] = [1,2,3,4,5,6,7,8];
  // patientId:number[]=[101,102,103,104,104,105];
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
    let employeeId;
    let employeeName;
    if(this.userDetailsFromLogin.userRoleId.roleType === "Physician"){
      this.form.get('employeeId')?.setValue(this.physicianDetailsFromLogin.employeeId);
      this.form.get('employeeName')?.setValue(this.physicianDetailsFromLogin.title + " " + this.physicianDetailsFromLogin.firstName + " " + this.physicianDetailsFromLogin.lastName);
      employeeId = this.form.get('employeeId')?.value;
      employeeName = this.form.get('employeeName')?.value
    }

    if(this.userDetailsFromLogin.userRoleId.roleType === "Nurse"){
     employeeId=   this.form.get('employeeId')?.value;
      employeeName = this.form.get('employeeName')?.value;
    }

    if(this.userDetailsFromLogin.userRoleId.roleType === "Patient"){
      employeeId=   this.form.get('employeeId')?.value;
       employeeName = this.form.get('employeeName')?.value;
     }

     console.log("selected date: " , this.form.get('appointmentDate')?.value);

     const selectedDate :Moment = this.form.get('appointmentDate')?.value
     if(selectedDate.isValid()){
       console.log("valid dat")
       const month = selectedDate.toObject().months + 1;
       const year = selectedDate.toObject().years;
       const date = selectedDate.toObject().date;
      //  console.log("moment date: ",moment.'DD-MM-YYYY'));
       console.log(month);    
     }
     
    
    this.timeSlotService.getTimeSlotByDoctorIdAndDate(this.form.get('employeeId')?.value,this.form.get('appointmentDate')?.value).subscribe(res=>{
      this.timeSlotData= res;
      console.log("Time slot data:",this.timeSlotData);
    }
      )
  }

  loadPatientName(patient: PatientRegistration, event:any){
    // this.patients = ;
    console.log("patient details from select: " , patient);
    if(event.isUserInput){
      this.patientName = patient.title + " " + patient.firstName + " " + patient.lastName;
      this.form.controls['patientName'].setValue(this.patientName);
    }
  }

  loadDoctorNames(specialisation:string, event:any){
    
    if(event.isUserInput){
      console.log("specialisation from select: " , specialisation);
      this.employeeService.getEmployeeBySpecialisation(specialisation).subscribe(response =>{
        this.employeeDetails = response;

      })
    }
  }
}
