import { Component, OnInit } from '@angular/core';
import { Appointments } from 'src/app/entities/appointments';
import { Employee } from 'src/app/entities/employee';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { User } from 'src/app/entities/user';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css'],
})
export class NurseDashboardComponent implements OnInit {
  isMale: boolean = false;
  isFemale: boolean = false;
  userDetailsFromLogin!: User;
  nurseDetailsFromLogin!: Employee;
  employeeName!: String;
  employeeGender!: String;
  specialisation!: String;
  employeeDetailsFromLogin!: Employee;
  appointmentData: Appointments[] = [];
  countAllAppointment!: number;
  employeeActiveCount!: Employee;
  patientActiveCount!: PatientRegistration[];

  constructor(
    private employeeService: EmployeeService,
    private schedulingService: SchedulingService,
    public patientRegistrationService: PatientRegistrationService
  ) {}

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

      this.employeeName =
        this.nurseDetailsFromLogin.title +
        ' ' +
        this.nurseDetailsFromLogin.firstName +
        ' ' +
        this.nurseDetailsFromLogin.lastName;
      this.employeeGender = this.nurseDetailsFromLogin.gender;
      this.specialisation = this.nurseDetailsFromLogin.specialisation;
      // get gender for male/female  Profile pic
      // if (this.nurseDetailsFromLogin.gender === 'male'){
      //   this.isMale=true;
      // }
      // if (this.nurseDetailsFromLogin.gender === 'female'){
      //   this.isFemale=true;
      // }
      this.schedulingService
        .getAllAppointmentList()
        .subscribe((appointment) => {
          this.appointmentData = appointment;
          this.countAllAppointment = this.appointmentData.length;
        });
    }
    this.employeeService
      .getAllEmpoyeeActiveCount()
      .subscribe((employeeActiveCount) => {
        this.employeeActiveCount = employeeActiveCount;
        console.log("hello employee - ",this.employeeActiveCount);
      });

    this.patientRegistrationService
      .getAllActivePatientCount()
      .subscribe((patientActiveCount) => {
        this.patientActiveCount = patientActiveCount;
        console.log("hello patient - ", this.patientActiveCount);
      });

      
  }
}
