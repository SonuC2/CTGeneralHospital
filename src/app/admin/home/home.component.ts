import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userAppData: any;
  public appUserCount1: any;
  public appUserCount2: any;
  public appUserCount3: any;
  public appUserCount4: any;
  public appUserCount5: any;
  public userLabel: any;
  public options: any;
  public userUsageHoursData:any;
  constructor() {}

  appUsageData = [
    { name: 'user1', country: 'USA', appname: 'Patients' },
    { name: 'user2', country: 'UK', appname: 'Patients' },
    { name: 'user3', country: 'Canada', appname: 'Patients' },
    { name: 'user4', country: 'Germany', appname: 'Patients' },
    { name: 'user5', country: 'Poland', appname: 'Hospital users' },
    { name: 'user6', country: 'USA', appname: 'Hospital users' },
    { name: 'user7', country: 'Canada', appname: 'Hospital users' },
    { name: 'user8', country: 'Germany', appname: 'Active Patients' },
    { name: 'user9', country: 'USA', appname: 'Active Patients' },
    { name: 'user10', country: 'Germany', appname: 'Active Patients' },
    { name: 'user11', country: 'Canada', appname: 'Active Patients' },
    { name: 'user12', country: 'USA', appname: 'Active Patients' },
    { name: 'user13', country: 'India', appname: 'Active Patients' },
    { name: 'user14', country: 'India', appname: 'Active Patients' },
    { name: 'user17', country: 'India', appname: 'Active hospital users' },
    { name: 'user18', country: 'India', appname: 'Active hospital users' },
    { name: 'user19', country: 'Canada', appname: 'Active hospital users' },
    { name: 'user20', country: 'USA', appname: 'Active hospital users' },
    { name: 'user21', country: 'manager', appname: 'Active hospital users' },
  ];

  ngOnInit() {
    this.appUserCount1 = this.appUsageData.filter(
      (app) => app.appname === 'Patients'
    ).length;
    this.appUserCount2 = this.appUsageData.filter(
      (app) => app.appname === 'Hospital users'
    ).length;
    this.appUserCount3 = this.appUsageData.filter(
      (app) => app.appname === 'Active Patients'
    ).length;
    this.appUserCount5 = this.appUsageData.filter(
      (app) => app.appname === 'Active hospital users'
    ).length;

    this.userLabel = this.appUsageData
      .map((app) => app.appname)
      .filter((value, index, self) => self.indexOf(value) === index);

    this.userAppData = {
      labels: this.userLabel,
      datasets: [
        {
          data: [
            this.appUserCount1,
            this.appUserCount2,
            this.appUserCount3,
            this.appUserCount4,
            this.appUserCount5,
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
      labels: ['Jan', 'Feb', 'March', 'April'],
      datasets: [
        {
          label: 'Hospital Users',
          backgroundColor: '#42A5F5',
          data: [44, 65, 23, 77],
        },
        {
          label: 'Patients',
          backgroundColor: '#ff0000',
          borderColor: '#7CB342',
          data: [14, 65, 16, 100],
        },
      ],
    };
  }
}

