import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
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
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css'],
})
export class EditAppointmentComponent implements OnInit {
  form!: FormGroup;
  appointmentId!: any;
  appointmentdata!:Appointments;
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
  rescheduleTimeSlotData!:Timeslot[];
  slot!: Timeslot;
  slotId!: number;
  patientsDetailsFromLogin!: PatientRegistration;
  // appointmentStatus: String = 'Rescheduled';

  constructor(
    private fb: FormBuilder,
    private service: SchedulingService,
    private route: Router,
    private router: ActivatedRoute,
    private location: Location,
    private timeSlotService: TimeslotService,
    private patientRegService : PatientRegistrationService,
    private employeeService:EmployeeService,
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
      this.isPhysician =false;
      this.isPatient = true;
      this.isNurse =false;
      // this.form.get('patientId')?.setValue(this.patientsDetailsFromLogin.patientId);
      // this.form.get('patientName')?.setValue(this.patientsDetailsFromLogin.firstName + " " + this.patientsDetailsFromLogin.lastName);
    }
    

    this.appointmentId = this.router.snapshot.paramMap.get('index');

    this.form = this.fb.group({
      slotId!:[],
      employeeId: [],
      employeeName: [],
      date: [],
      startTime: [],
      endTime: [],
    });

    this.form = this.fb.group({
      appointmentId:[],
      meetingTitle: [],
      description: [],
      specialisation: [],
      employeeId: [],
      employeeName: [],
      appointmentDate: [],
      timeSlot: [],
      timeSlotString:[],
      reason: [],
      rescheduleDate: [],
      rescheduleTimeSlot: [],
      rescheduleTimeSlotString:[],
      patientId: [],
      patientName: [],
      appointmentStatus: [],
    });
    // this.appointmentTest=this.router.snapshot.paramMap.get("index");
    // console.log(this.appointmentTest)
    this.getAppointmentData();
   
  }

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  specialisation: string[] = [
    'Neurologists',
    'Radiologists',
    'Anesthesiologists',
    'Psychiatrists',
    'Gynecologists',
    'Dermatologists',
    'Cardiologists'
  ];
 
  // timeSlot: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // rescheduleTimeSlot:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // for patient onSubmit method call
  onSubmit() {
   
    this.form.get('appointmentId')?.setValue(this.appointmentId);
    console.log(this.appointmentId)
    this.form.get('appointmentStatus')?.setValue('Rescheduled');
    this.form.get('patientId')?.setValue(this.patientsDetailsFromLogin.patientId);
    this.form.get('patientName')?.setValue(this.patientsDetailsFromLogin.firstName + " " + this.patientsDetailsFromLogin.lastName);
    console.log(this.form.value);
    this.service.updateAppointment(this.form.value).subscribe();
    this.route.navigate(['shared/sidebar/scheduling/appointment-list']);
  }

   // for Nurse onSubmit method call

  onSubmitByNurse(){
    this.form.get('appointmentId')?.setValue(this.appointmentId);
    this.form.get('employeeId')?.setValue(this.selectedEmployeeId);
    this.form.get('appointmentStatus')?.setValue("Booked");
    this.service.updateAppointment(this.form.value).subscribe();
    this.form.reset();
    // this.form.get('patientName')?.setValue(this.patientsDetailsFromLogin.firstName + " " + this.patientsDetailsFromLogin.lastName);
    console.log("form submiteed by nurse - " , this.form.value)
  }

  // for Doctor onsubmit method call
  onSubmitByDoctor(){
    this.form.get('appointmentId')?.setValue(this.appointmentId);
    
    this.form.get('appointmentStatus')?.setValue("Booked");
    this.form.get('employeeId')?.setValue(this.physicianDetailsFromLogin.employeeId);
    this.form.get('specialisation')?.setValue(this.physicianDetailsFromLogin.specialisation);
    this.form.get('employeeName')?.setValue(this.physicianDetailsFromLogin.title +" " + this.physicianDetailsFromLogin.firstName + " " + this.physicianDetailsFromLogin.lastName);
    
    console.log("form submiteed by Doctor - " , this.form.value);

    this.service.updateAppointment(this.form.value).subscribe();
    this.form.reset();

  }

  getAppointmentData() {
   
    this.service.getAppointmentById(this.appointmentId).subscribe(data=>{
      this.appointmentdata = data;
    // let data: any= this.location.getState();
    console.log("edit list"+this.appointmentdata);

    this.form.get('specialisation')?.setValue(this.appointmentdata.specialisation);
    this.form.get('employeeId')?.setValue(this.appointmentdata.employeeId);
    this.form.get('employeeName')?.setValue(this.appointmentdata.employeeName);
    this.form.get('patientId')?.setValue(this.appointmentdata.patientId);
    this.form.get('patientName')?.setValue(this.appointmentdata.patientName);
    this.form.get('meetingTitle')?.setValue(this.appointmentdata.meetingTitle);
    this.form.get('description')?.setValue(this.appointmentdata.description);
    this.form.get('appointmentDate')?.setValue(this.appointmentdata.appointmentDate);
    this.form.get('timeSlot')?.setValue(this.appointmentdata.timeSlot);
    this.form.get('timeSlotString')?.setValue(this.appointmentdata.timeSlotString);
    // this.form.get('reason')?.setValue(this.appointmentdata.reason);
    // this.form.get('rescheduleDate')?.setValue(this.appointmentdata.rescheduleDate);
    // this.form.get('rescheduleTimeSlot')?.setValue(this.appointmentdata.rescheduleTimeSlot);
    // this.form.get('rescheduleTimeSlotString')?.setValue(this.appointmentdata.rescheduleTimeSlotString);
    this.form.get('appointmentStatus')?.setValue(this.appointmentdata.appointmentStatus);
  });
}

// load TimeSlot of doctor - date-time both
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
  this.timeSlotService.getTimeSlotByDoctorId(this.selectedEmployeeId).subscribe(res=>{
    this.timeSlotData= res;
    console.log("Time slot data:",this.timeSlotData);

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
    this.form.controls['rescheduleTimeSlotString'].setValue(this.time);
    this.form.controls['rescheduleTimeSlot'].setValue(slot.slotId);
    this.dateToDB = moment(slot.date).format("YYYY-MM-DD");
    console.log("Slot Date Formate"+this.dateToDB);
    this.form.controls['rescheduleDate'].setValue(this.dateToDB);

  }
}

}
