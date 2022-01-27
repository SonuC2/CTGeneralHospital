import { Component, OnInit } from '@angular/core';
import { Appointments } from 'src/app/entities/appointments';
import { Employee } from 'src/app/entities/employee';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { User } from 'src/app/entities/user';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
})
export class PatientDashboardComponent implements OnInit {
  isMale: boolean = false;
  isFemale: boolean = false;
  userDetailsFromLogin!: User;
  nurseDetailsFromLogin!: Employee;
  patientName!: String;
  patientdob!: any;
  specialisation!: String;
  employeeDetailsFromLogin!: Employee;
  appointmentData: Appointments[] = [];
  countAllAppointment!: number;
  
  patientsDetailsFromLogin!: PatientRegistration;
  contactNo!: number;
  emailId!: string;

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

    if (this.userDetailsFromLogin.userRoleId.roleType === 'Patient') {
      this.patientsDetailsFromLogin = JSON.parse(
        sessionStorage.getItem('patientDetails') || '{}'
      );
      console.log(
        'Physician Details from login: ',
        this.patientsDetailsFromLogin
      );

      this.patientName =
        this.patientsDetailsFromLogin.title +
        ' ' +
        this.patientsDetailsFromLogin.firstName +
        ' ' +
        this.patientsDetailsFromLogin.lastName;
      this.patientdob = this.patientsDetailsFromLogin.dateOfBirth;
      this.contactNo = this.patientsDetailsFromLogin.contactNumber;
      this.emailId = this.patientsDetailsFromLogin.email;
      // get gender for male/female  Profile pic
      // if (this.nurseDetailsFromLogin.gender === 'male'){
      //   this.isMale=true;
      // }
      // if (this.nurseDetailsFromLogin.gender === 'female'){
      //   this.isFemale=true;
      // }
      this.schedulingService.getAppointmentForPatient(this.patientsDetailsFromLogin.patientId).subscribe(appointment =>{
        this.appointmentData = appointment;
        this.countAllAppointment = this.appointmentData.length;
      })
    }
    // this.employeeService
    //   .getAllEmpoyeeActiveCount()
    //   .subscribe((employeeActiveCount) => {
    //     this.employeeActiveCount = employeeActiveCount;
    //     console.log('hello employee - ', this.employeeActiveCount);
    //   });

    // this.patientRegistrationService
    //   .getAllActivePatientCount()
    //   .subscribe((patientActiveCount) => {
    //     this.patientActiveCount = patientActiveCount;
    //     console.log('hello patient - ', this.patientActiveCount);
    //   });
  }
}
