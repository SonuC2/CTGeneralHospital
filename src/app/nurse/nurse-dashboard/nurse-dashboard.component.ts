import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entities/employee';
import { User } from 'src/app/entities/user';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent implements OnInit {

  isMale: boolean = false;
  isFemale: boolean = false;
  userDetailsFromLogin!: User;
  nurseDetailsFromLogin!: Employee;
  employeeName!:String;
  employeeGender!:String;
  specialisation!:String;
  employeeDetailsFromLogin!:Employee;

  constructor( private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.userDetailsFromLogin = JSON.parse(
      sessionStorage.getItem('userDetails') || '{}'
    );
    console.log('User Details from login: ', this.userDetailsFromLogin);

    if (this.userDetailsFromLogin.userRoleId.roleType === 'Nurse') {
      this.nurseDetailsFromLogin = JSON.parse(
        sessionStorage.getItem('nurseDetailsFromLogin') || '{}'
      );
      console.log('Physician Details from login: ', this.nurseDetailsFromLogin);
     
      this.employeeName= this.nurseDetailsFromLogin.title + " " + this.nurseDetailsFromLogin.firstName + " " + this.nurseDetailsFromLogin.lastName
      this.employeeGender=this.nurseDetailsFromLogin.gender;
      this.specialisation=this.nurseDetailsFromLogin.specialisation;
      // get gender for male/female  Profile pic 
      if (this.nurseDetailsFromLogin.gender === 'male'){
        this.isMale=true;
      }
      if (this.nurseDetailsFromLogin.gender === 'female'){
        this.isFemale=true;
      }
    }
  }

}
