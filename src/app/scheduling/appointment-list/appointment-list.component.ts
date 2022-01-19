import { Component, Input, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { Employee } from 'src/app/entities/employee';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { User } from 'src/app/entities/user';
import { SchedulingService } from 'src/app/services/scheduling.service';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit {

  appointmentData: Appointments[]=[];
  dataSource = new MatTableDataSource<Appointments>();
  @Input() appointmentid=0;
  userDetailsFromLogin!:User;
  employeeDetailsFromLogin!:Employee;
  patientDetailsFromLogin!:PatientRegistration;
  isEmployee:boolean =false;
  constructor(private schedulingService:SchedulingService,private router: Router,private route: ActivatedRoute) { }

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
    console.log(element);
    this.schedulingService.cancelAppointment(element).subscribe();
    this.router.navigate(['scheduling/appointment-list']);
    window.location.reload();
  }

  editAppointment(element:any){
    console.log("inside edit appointemnt",element);
    this.router.navigate(["/shared/sidebar/scheduling/edit-appointment/",element]);
    
  }

  addPatientVisit(element:any){
    console.log("Element data:" , element);
    this.router.navigate(['shared/sidebar/nurse/patient-visit'])
  }
}
