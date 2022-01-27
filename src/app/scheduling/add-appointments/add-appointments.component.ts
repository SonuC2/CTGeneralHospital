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
import { PatientService } from 'src/app/services/patient.service';
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
  selectedEmployeeId!:number;
  time: any;
  dateToDB!: String;
  
  slot!: Timeslot;
  slotId!: number;
  patientsDetailsFromLogin!: PatientRegistration;
  varifyNew!:boolean;
  section1=false;
  section2=true;
  constructor(
    private fb: FormBuilder,
    private service: SchedulingService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private timeSlotService: TimeslotService,
    private patientRegService : PatientRegistrationService,
    private employeeService:EmployeeService,
    private patientService:PatientService
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

      this.patientRegService.getAllActivePatientList().subscribe(patients =>{
        this.patients = patients;
        console.log("Allpatient list: ", this.patients)
      })
      this.timeSlotService.getTimeSlotByDoctorId(this.physicianDetailsFromLogin.employeeId).subscribe(res=>{
        this.timeSlotData= res;
        console.log("Time slot data:",this.timeSlotData);
      })

    }
    if(this.userDetailsFromLogin.userRoleId.roleType === "Nurse"){
      this.physicianDetailsFromLogin = JSON.parse(sessionStorage.getItem('nurseDetailsFromLogin') || '{}');
      console.log("Nurse Details from login: ", this.physicianDetailsFromLogin);
      this.isPhysician =false;
      this.isPatient = false;
      this.isNurse =true;

      this.patientRegService.getAllActivePatientList().subscribe(patients =>{
        this.patients = patients;
        console.log("Allpatient list: ", this.patients)
      })
    }

    if(this.userDetailsFromLogin.userRoleId.roleType === "Patient"){
      this.patientsDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
      console.log("PAtient Details from login: ", this.patientsDetailsFromLogin);
      this.patientService.checkPatientDetailsById(this.patientsDetailsFromLogin.patientId).subscribe(data=>
        {
          this.varifyNew=data;
     if(data===true)
      {
        console.log("return true")
        
        this.section1=true;
        this.section2=false;
        
      }if(data===false){
        this.section1=false;
        this.section2=true;
      }
      
        });
      
      this.isPhysician =false;
      this.isPatient = true;
      this.isNurse =false;
      // this.form.get('patientId')?.setValue(this.patientsDetailsFromLogin.patientId);
      // this.form.get('patientName')?.setValue(this.patientsDetailsFromLogin.firstName + " " + this.patientsDetailsFromLogin.lastName);
    }

    this.form = this.fb.group({
      slotId!:[],
      employeeId: [],
      employeeName: [],
      date: [],
      startTime: [],
      endTime: [],
    });

    this.form = this.fb.group({
      meetingTitle!:[],
      description!: [],
      specialisation!: [],
      employeeId!:[],
      employeeName!:[],
      appointmentDate!:[],
      timeSlot!: [],
      timeSlotString:[],
      reason!:[],
      rescheduleDate!:[],
      rescheduleTimeSlot!:[],
      rescheduleTimeSlotString:[],
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
 
  timeSlot: number[] = [1,2,3,4,5,6,7,8];

  onSubmit() {
    // console.log(this.form.value); 
    // this.form.get('employeeName')?.setValue('Dr. John Auguston');
    // this.form.get('appointmentStatus')?.setValue('Requested');
    // this.service.addAppointment(this.form.value).subscribe();
    // this.route.navigate(["/scheduling/appointment-list"]);
   
    if(this.userDetailsFromLogin.userRoleId.roleType === "Patient"){
      this.patientsDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
      this.form.get('patientId')?.setValue(this.patientsDetailsFromLogin.patientId);
      this.form.get('patientName')?.setValue(this.patientsDetailsFromLogin.firstName + " " + this.patientsDetailsFromLogin.lastName);
      
      // this.form.get('employeeName')?.setValue('Dr. John Auguston');
      this.form.get('appointmentStatus')?.setValue('Requested');
      this.service.addAppointment(this.form.value).subscribe();
      this.route.navigate(["shared/sidebar/scheduling/appointment-list"]);
      console.log(this.form.value); 
     }
  }

  onSubmitByNurse(){
    this.form.get('employeeId')?.setValue(this.selectedEmployeeId);
    this.form.get('appointmentStatus')?.setValue("Booked");
    this.service.addAppointment(this.form.value).subscribe();
    this.form.reset();
    // this.form.get('patientName')?.setValue(this.patientsDetailsFromLogin.firstName + " " + this.patientsDetailsFromLogin.lastName);
    console.log("form submiteed by nurse - " , this.form.value)
  }

  onSubmitByDoctor(){
    this.form.get('employeeId')?.setValue(this.physicianDetailsFromLogin.employeeId);
    this.form.get('specialisation')?.setValue(this.physicianDetailsFromLogin.specialisation);
    this.form.get('specialisation')?.setValue(this.physicianDetailsFromLogin.specialisation);
    this.form.get('employeeName')?.setValue(this.physicianDetailsFromLogin.title +" " + this.physicianDetailsFromLogin.firstName + " " + this.physicianDetailsFromLogin.lastName);
    this.form.get('appointmentStatus')?.setValue("Booked");
    console.log("form submiteed by Doctor - " , this.form.value);

    this.service.addAppointment(this.form.value).subscribe();
    this.form.reset();

  }

  // //date picker filter
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0;
  // };

  loadTimeSlot(){
    let employeeId;
    let employeeName;
    if(this.userDetailsFromLogin.userRoleId.roleType === "Physician"){
      this.form.get('employeeId')?.setValue(this.physicianDetailsFromLogin.employeeId);
      this.selectedEmployeeId=this.physicianDetailsFromLogin.employeeId;
      
      this.form.get('employeeName')?.setValue(this.physicianDetailsFromLogin.title + " " + this.physicianDetailsFromLogin.firstName + " " + this.physicianDetailsFromLogin.lastName);
      employeeId = this.form.get('employeeId')?.value;
      employeeName = this.form.get('employeeName')?.value
      console.log(this.form.get('employeeId')?.value+" Check ones under physician");
    }

    if(this.userDetailsFromLogin.userRoleId.roleType === "Nurse"){
      this.form.get('employeeId')?.setValue(this.selectedEmployeeId);
      employeeName = this.form.get('employeeName')?.value;
    }

    if(this.userDetailsFromLogin.userRoleId.roleType === "Patient"){
      this.form.get('employeeId')?.setValue(this.selectedEmployeeId);
       employeeName = this.form.get('employeeName')?.value;
       console.log(employeeName);
     }

  
     
    // console.log(this.form.get('appointmentDate')?.value +" Check onesssssssssssss");
    // this.timeSlotService.getTimeSlotByDoctorIdAndDate(this.selectedEmployeeId,this.dateToDB).subscribe(res=>{
    //   this.timeSlotData= res;
    //   console.log("Time slot data:",this.timeSlotData);
    // })
    
    
    this.timeSlotService.getTimeSlotByDoctorId(this.selectedEmployeeId).subscribe(res=>{
      this.timeSlotData= res;
      console.log("Time slot data:",this.timeSlotData);
     
      // this.dateToDB = moment(this.timeSlotData).format("YYYY-MM-DD");
    // console.log("Date Formate"+this.dateToDB);
    //   this.timeSlotData= this.timeSlotData.filter(item => item.date ==='2022-01-24')
      // this.List = this.List.filter(item => item.type === 'Vehicle');
      // console.log("Time after filter slot data:",this.timeSlotData);
    })
  
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

  setDoctorId(employeeId:any, event:any){
    if(event.isUserInput){
      console.log("Doctor employee Id " , employeeId);
     this.selectedEmployeeId=employeeId;

    }
  }


  // modelChanged(date:any) {
  //   // var theDate = new Date(Date.parse(date));
  //   // const localDate = theDate.toLocaleString().split(" ");
  //   // const localDate1 = theDate.toLocaleString().slice(0,9);
  //   // console.log(" Hello this is fun - "+localDate);
  //   // console.log(" Hello this is funceck - "+localDate1);

  //   this.dateToDB = moment(date).format("YYYY-MM-DD");
  //   console.log("Date Formate"+this.dateToDB);
  // }
  setTimeSlot(slot:Timeslot){
    this.slot=slot;
    console.log( this.slot.slotId);
    this.slotId=this.slot.slotId;
    console.log(  this.slotId);
   
  }
  LoadTimeSlot(slot:Timeslot, event:any){
    if(event.isUserInput){
      console.log("Doctor employee Id " , slot);
      this.time = slot.startTime + " - " + slot.endTime;
      this.form.controls['timeSlotString'].setValue(this.time);
      this.form.controls['timeSlot'].setValue(slot.slotId);
      this.dateToDB = moment(slot.date).format("YYYY-MM-DD");
      console.log("Slot Date Formate"+this.dateToDB);
      this.form.controls['appointmentDate'].setValue(this.dateToDB);

    }
  }
  
}
