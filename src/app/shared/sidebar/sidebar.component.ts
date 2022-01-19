import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Employee } from 'src/app/entities/employee';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isNurse: boolean = false;
  isAdmin: boolean = false;
  title = 'CTGeneralHospital';
  isExpanded: boolean = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isPatient: boolean = true;
  isPhysician: boolean = false;

  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showPatientSubMenu: boolean = false;
  showEmployeeSubMenu : boolean = false;
  showPhysicianSubMenu : boolean = false;

  // disabled link
  enterDetails:boolean=false;
  viewDetails:boolean=false;
  MyVisitHistory:boolean=false;
  downloadMydata:boolean=true;
  appointment:boolean=true;
  userDetail !:any;
  userObject!:any;

  loggedInUserName!:string;
  loggedInUserEmail!:string;
  employeeDetailsFromLogin!:Employee;
  patientDetailsFromLogin!:PatientRegistration;
   constructor(private observer: BreakpointObserver,private employeeService :EmployeeService,private patientService:PatientRegistrationService) {
    // console.log("From sidebar sessionstorage: " , sessionStorage['get']('userDetails'))
   
    
  }
 
   ngOnInit(): void {
     console.log("From sidebar sessionstorage: " , sessionStorage.getItem('userDetails'))
    this.userDetail = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
   // this.userObject =JSON.parse(sessionStorage.getItem('userDetails'));
   this.loggedInUserEmail = this.userDetail.email;
   
   console.log("logged in user email: ", this.loggedInUserEmail)
    if(this.userDetail.userRoleId.roleType === "Nurse"){
      this.isNurse =true;
      this.isPatient = false;
      this.isAdmin = false;
      this.isPhysician = false;
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('nurseDetailsFromLogin') || '{}');
      this.loggedInUserName = this.employeeDetailsFromLogin.title + " " + this.employeeDetailsFromLogin.firstName + " " + this.employeeDetailsFromLogin.lastName;
      console.log("User name: " , this.loggedInUserName);
      
    }
    if(this.userDetail.userRoleId.roleType === "Patient"){
      this.isNurse =false;
      this.isPatient = true;
      this.isAdmin =false;
      this.isPhysician = false;
      this.patientDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
      this.loggedInUserName = this.patientDetailsFromLogin.title + " " + this.patientDetailsFromLogin.firstName + " " + this.patientDetailsFromLogin.lastName
    }

    if(this.userDetail.userRoleId.roleType === "Admin"){
      this.isNurse =false;
      this.isPatient = false;
      this.isAdmin = true;
      this.isPhysician = false;
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('adminDetailsFromLogin') || '{}');
      this.loggedInUserName = this.employeeDetailsFromLogin.title + " " + this.employeeDetailsFromLogin.firstName + " " + this.employeeDetailsFromLogin.lastName;
      console.log("User name: " , this.loggedInUserName);
    }

    if(this.userDetail.userRoleId.roleType === "Physician"){
      this.isNurse =false;
      this.isPatient = false;
      this.isAdmin = false;
      this.isPhysician = true;
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('physicianDetailsFromLogin') || '{}');
      this.loggedInUserName = this.employeeDetailsFromLogin.title + " " + this.employeeDetailsFromLogin.firstName + " " + this.employeeDetailsFromLogin.lastName;
      console.log("User name", this.loggedInUserName);
      
    }
   }
   
   ngAfterViewInit() {
     this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
       if (res.matches) {
         this.sidenav.mode = 'over';
         this.sidenav.close();
       } else {
         this.sidenav.mode = 'side';
         this.sidenav.open();
       }
     });
   }
   mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  
}
