import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public employeeCountTest!: number;
  public patientActiveCount!: any;
  public patientInactiveCount!: any;
  public employeeActiveCount!: any;
  public userAppData: any;
  public appUserCount1: any;
  public appUserCount2: any;
  public appUserCount3: any;
  public appUserCount4: any;
  public appUserCount5: any;
  public userLabel: any;
  public options: any;
  public userUsageHoursData: any;
  constructor(
    public employeeService: EmployeeService,
    public patientRegistrationService: PatientRegistrationService
  ) {}

  appUsageData = [
    { appname: 'Hospital users' },
    { appname: 'Active hospital users' },
    { appname: 'Active Patients' },
    { appname: 'All patients' },
    { appname: 'Inactive patients' },
  ];

  ngOnInit() {
    this.employeeService
      .getAllEmpoyeeCount()
      .subscribe((employeeCount1: number) => {
        this.employeeCountTest = employeeCount1;
      });

    this.employeeService
      .getAllEmpoyeeActiveCount()
      .subscribe((employeeActiveCount) => {
        this.employeeActiveCount = employeeActiveCount;
        console.log(this.employeeActiveCount);
      });

    this.patientRegistrationService
      .getAllActivePatientCount()
      .subscribe((patientActiveCount) => {
        this.patientActiveCount = patientActiveCount;
        console.log(this.patientActiveCount);
      });

    this.patientRegistrationService
      .getAllInactivePatientList()
      .subscribe((patientInactiveCount) => {
        this.patientInactiveCount = patientInactiveCount;
        console.log(this.patientInactiveCount);
      });

    this.userLabel = this.appUsageData
      .map((app) => app.appname)
      .filter((value, index, self) => self.indexOf(value) === index);

    setTimeout(() => {
      this.userAppData = {
        labels: this.userLabel,
        datasets: [
          {
            data: [
              this.employeeCountTest,
              this.employeeActiveCount,
              this.patientActiveCount,
              this.patientInactiveCount,
              this.patientInactiveCount,
            ],
            backgroundColor: [
              '#ff0000',
              '#0000FF',
              '#FFFF00',
              '#FFC0CB',
              '#7f00ff ',
            ],
          },
        ],
      };
      this.userUsageHoursData = {
        labels: [
          'All Hospital Users',
          'Active Hospital Users',
          'All Patients',
          'Active Patients',
        ],
        datasets: [
          {
            label: 'All Users',
            backgroundColor: '#42A5F5',
            data: [
              this.employeeCountTest,
              this.employeeActiveCount,
              this.patientInactiveCount,
              this.patientActiveCount,
            ],
          },
        ],
      };
    }, 1000);
  }
}
