import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  titleEmp: string[] = ['Mr.', 'Ms.', 'Dr.', 'Mrs.'];
  constructor() { }

  ngOnInit(): void {
  }
  onSave(){
    console.log("hi");
  }
}
