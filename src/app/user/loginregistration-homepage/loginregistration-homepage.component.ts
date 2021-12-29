import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavedialogComponent } from '../savedialog/savedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
//import { PatientRegistrationService } from '../services/patientRegistration.service';
//import { PatientRegistrationService } from '../services/PatientRegistration.service';
interface Title {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-loginregistration-homepage',
  templateUrl: './loginregistration-homepage.component.html',
  styleUrls: ['./loginregistration-homepage.component.css'],
})
export class LoginregistrationHomepageComponent implements OnInit {
  [x: string]: any;
  titles: Title[] = [
    { value: 'Mr.-0', viewValue: 'Mr.' },
    { value: 'Ms.-1', viewValue: 'Ms.' },
    { value: 'Mrs.-2', viewValue: 'Mrs.' },
    { value: 'Dr.-3', viewValue: 'Dr.' },
  ];
  selectedValue: string | undefined;
  isFormShown: boolean = false;

  isRegFormShown: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
   private patientregistrationService: PatientRegistrationService
  ) {}
  form!: any;
  dateOfBirth!: Date;
  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      dateOfBirth: [''],
      contactNumber: [''],
      password: [''],
      newpassword: [''],
    });
  }
  loginPageShow() {
    this.isFormShown = true;
    this.isRegFormShown = false;
  }
  registerPageShow(): void {
    this.isRegFormShown = true;
    this.isFormShown = false;
  }
  onLogin(): void {
    this.router.navigate(['/dashboard']);
  }
  onRegister() {
    this.router.navigate(['/afterreg-lendingpage']);
    this.dialog.open(SavedialogComponent);
  }
  submitRegister() {
    console.log(this.form.value);
   this.patientregistrationService.submitPatientRegDetails(this.form.value).subscribe();
  }
}
