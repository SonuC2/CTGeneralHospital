import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavedialogComponent } from '../savedialog/savedialog.component';
import {MatDialog} from '@angular/material/dialog';  
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
 
  constructor(private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {}
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
  this.dialog.open(SavedialogComponent);
}}

