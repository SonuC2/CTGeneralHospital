import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'; 
import { SavedialogComponent } from '../savedialog/savedialog.component';
@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  titleEmp: string[] = ['Mr.', 'Ms.', 'Dr.', 'Mrs.'];
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  onSave(){
    this.dialog.open(SavedialogComponent);
}
}