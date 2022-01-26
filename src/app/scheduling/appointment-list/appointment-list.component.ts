import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { Employee } from 'src/app/entities/employee';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { User } from 'src/app/entities/user';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit {
  form!: FormGroup;
  appointmentData: Appointments[]=[];
  dataSource = new MatTableDataSource<Appointments>();
  @Input() appointmentid=0;
  userDetailsFromLogin!:User;
  employeeDetailsFromLogin!:Employee;
  patientDetailsFromLogin!:PatientRegistration;
  isEmployee:boolean =false;
  cancelAppointmentData!:Appointments;
  constructor(private schedulingService:SchedulingService,private router: Router,private route: ActivatedRoute,private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.userDetailsFromLogin = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    console.log("User Details from login: ", this.userDetailsFromLogin);

    if(this.userDetailsFromLogin.userRoleId.roleType === "Physician"){
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('physicianDetailsFromLogin') || '{}');
      console.log("Physician Details from login: ", this.employeeDetailsFromLogin);

      this.isEmployee =true;
      this.schedulingService.getAppointmentForEmployee(this.employeeDetailsFromLogin.employeeId).subscribe(appointment =>{
        this.appointmentData = appointment;
        this.dataSource.data = this.appointmentData;
        console.log('Data source : ', this.dataSource.data);
      })
     
    }
    if(this.userDetailsFromLogin.userRoleId.roleType === "Nurse"){
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('nurseDetailsFromLogin') || '{}');
      console.log("Nurse Details from login: ", this.employeeDetailsFromLogin);
      this.isEmployee =true;
      this.schedulingService.getAllAppointmentList().subscribe((appointment) => {
        this.appointmentData = appointment;
        this.dataSource.data = this.appointmentData;
        console.log('Data source : ', this.dataSource.data);
  
      });
    }

    if(this.userDetailsFromLogin.userRoleId.roleType === "Patient"){
      this.patientDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
      console.log("Patient Details from login: ", this.patientDetailsFromLogin);
      this.isEmployee =false;
      this.schedulingService.getAppointmentForPatient(this.patientDetailsFromLogin.patientId).subscribe(appointment =>{
        this.appointmentData = appointment;
        this.dataSource.data = this.appointmentData;
        console.log('Data source : ', this.dataSource.data);
      })  
    }

    this.form = this.fb.group({
      appointmentId!:[],
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
  }

  displayedColumns: string[] = [
    'meetingTitle',
    'patientId',
    'patientName',
    'employeeName',
    'specialisation',
    'appointmentDate',
    'timeSlotString',
    'appointmentStatus',
    'action',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

//   navigateToUpdate(row:any){
 
//  console.log("Row id: " + row);
// // this.queryID= row.id;
//  this.router.navigate(['/scheduling/edit-appointment/',row])
// }

  cancelAppointment(element: Appointments) {
    this.form.get('appointmentId')?.setValue(element.appointmentId);
    this.form.get('specialisation')?.setValue(element.specialisation);
    this.form.get('employeeId')?.setValue(element.employeeId);
    this.form.get('employeeName')?.setValue(element.employeeName);
    this.form.get('patientId')?.setValue(element.patientId);
    this.form.get('patientName')?.setValue(element.patientName);
    this.form.get('meetingTitle')?.setValue(element.meetingTitle);
    this.form.get('description')?.setValue(element.description);
    this.form.get('appointmentDate')?.setValue(element.appointmentDate);
    this.form.get('timeSlot')?.setValue(element.timeSlot);
    this.form.get('timeSlotString')?.setValue(element.timeSlotString);
    this.form.get('reason')?.setValue(element.reason);
    this.form.get('rescheduleDate')?.setValue(element.rescheduleDate);
    this.form.get('rescheduleTimeSlot')?.setValue(element.rescheduleTimeSlot);
    this.form.get('rescheduleTimeSlotString')?.setValue(element.rescheduleTimeSlotString);
     this.form.get('appointmentStatus')?.setValue("Cancelled");
     console.log("hello cancel check" ,this.form.value);
    this.schedulingService.cancelAppointment(this.form.value).subscribe();
    // this.router.navigate(['/shared/sidebar/scheduling/appointment-list']);
    window.location.reload();
  }

  editAppointment(element:Appointments){
    console.log("inside edit appointemnt",element.appointmentId);
    this.router.navigate(["/shared/sidebar/scheduling/edit-appointment/",element.appointmentId]);
    
  }

  addPatientVisit(element:any){
    console.log("Element data:" , element);
    this.router.navigate(['shared/sidebar/nurse/add-visit/',element])
  }
}
