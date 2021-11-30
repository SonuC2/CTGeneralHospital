import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {
  titleEmp: string[] = ['Mr.', 'Ms.', 'Dr.', 'Mrs.'];
  constructor() { }

  ngOnInit(): void {
  }

}
