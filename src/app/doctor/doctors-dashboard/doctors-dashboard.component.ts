import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entities/employee';
import { User } from 'src/app/entities/user';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';

@Component({
  selector: 'app-doctors-dashboard',
  templateUrl: './doctors-dashboard.component.html',
  styleUrls: ['./doctors-dashboard.component.css'],
})
export class DoctorsDashboardComponent implements OnInit {
  
  isMale: boolean = false;
  isFemale: boolean = false;
  userDetailsFromLogin!: User;
  physicianDetailsFromLogin!: Employee;
  employeeName!:String;
  employeeGender!:String;
  specialisation!:String;
  employeeDetailsFromLogin!:Employee;

  

  constructor(
    private patientRegService: PatientRegistrationService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.userDetailsFromLogin = JSON.parse(
      sessionStorage.getItem('userDetails') || '{}'
    );
    console.log('User Details from login: ', this.userDetailsFromLogin);

    if (this.userDetailsFromLogin.userRoleId.roleType === 'Physician') {
      this.physicianDetailsFromLogin = JSON.parse(
        sessionStorage.getItem('physicianDetailsFromLogin') || '{}'
      );
      console.log('Physician Details from login: ', this.physicianDetailsFromLogin);
     
      this.employeeName= this.physicianDetailsFromLogin.title + " " + this.physicianDetailsFromLogin.firstName + " " + this.physicianDetailsFromLogin.lastName
      this.employeeGender=this.physicianDetailsFromLogin.gender;
      this.specialisation=this.physicianDetailsFromLogin.specialisation;
      // get gender for male/female  Profile pic 
      if (this.physicianDetailsFromLogin.gender === 'male'){
        this.isMale=true;
      }
      if (this.physicianDetailsFromLogin.gender === 'female'){
        this.isFemale=true;
      }
    }
   
  }

  




}
