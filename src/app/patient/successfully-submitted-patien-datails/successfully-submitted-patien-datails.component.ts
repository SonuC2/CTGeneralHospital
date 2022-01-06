import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-successfully-submitted-patien-datails',
  templateUrl: './successfully-submitted-patien-datails.component.html',
  styleUrls: ['./successfully-submitted-patien-datails.component.css']
})
export class SuccessfullySubmittedPatienDatailsComponent implements OnInit {
  form!:FormGroup;
  Patientdata!:any;
  constructor(private location:Location,private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
    firstName: [''],
    lastName: [''],
    dateOfBirth:[''],
    mobileNo: [''],
    gender: [''],
    race: [''],
    ethnicity: [''],
    email: [''],
    language: [''],
    address: ['']
  
  });
  this.data();
}


  data()
  {
    this.Patientdata =this.location.getState();
    this.form.get('firstName')?.setValue(this.Patientdata.firstName);
    this.form.get('lastName')?.setValue(this.Patientdata.lastName);
  }
}
