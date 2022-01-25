import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, mergeMap, pipe, retryWhen, throwError } from 'rxjs';
import { User } from 'src/app/entities/user';
import { ForgetpasswordService } from 'src/app/services/forgetpasswordservice.service';
import { UserService } from 'src/app/services/user.service';
import { SavedialogComponent } from '../savedialog/savedialog.component';

const isInvalidEmailError = (err: HttpErrorResponse) => err.status >= 500;
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})

export class ForgetpasswordComponent implements OnInit {

  submitted = false;
  forgetPasswordForm!: any;
  userDetails!: User;
  successMessage: boolean = false;
  failMessage: boolean = false;
  errorMessage: string = "email is invalid";
  changeMessage: string = "password reset"
  error!: string;
  success:Boolean=false;
  
  constructor(private router: Router, private fb: FormBuilder, private forgetService: ForgetpasswordService,
    private userService: UserService, private route: ActivatedRoute, private location: Location, private dialog: MatDialog,
    private http: HttpClient,) { }

  loginDetails!: User
  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required]],

    })
    this.getData();
  }
  get emailFormControl() {
    return this.forgetPasswordForm.controls;
  }
  getData() {
    let data: any = this.location.getState();
    console.log(data + 'data from login');
    this.loginDetails = data;
    console.log(this.loginDetails.email);
    this.forgetPasswordForm.get('email').setValue(this.loginDetails.email);
  }

  forget() {
    console.log('hi')
    //if(this.forgetPasswordForm.valid===true&&this.userDetails.email===this.forgetPasswordForm.value){
   // if (this.forgetPasswordForm.valid) {
     // this.dialog.open(SavedialogComponent);
    
    //}
    console.log("forget form: ", this.forgetPasswordForm.value)

    this.forgetService.forgetPassword(this.forgetPasswordForm.value).subscribe((response) => {
      console.log("Response received", response)
     // this.success=true;
    }
     , (error) => {

        // this.errorMsg=err.statusText;
        this.error = error
        console.log(error,'error of forget')
        this.forgetPasswordForm.reset();
       
      }

    );
    if(this.error===null){
      this.error='';
      this.dialog.open(SavedialogComponent);

    }
  }
  /*forget() {
    console.log('hi')
    //if(this.forgetPasswordForm.valid===true&&this.userDetails.email===this.forgetPasswordForm.value){
    if (this.error == '') {
      this.dialog.open(SavedialogComponent);
    }
    //}
    console.log("forget form: ", this.forgetPasswordForm.value)

    this.forgetService.forgetPassword(this.forgetPasswordForm.value).subscribe((response) => {
      console.log("Response received", response)
    }
      , (error) => {

        // this.errorMsg=err.statusText;

        this.error = error

      }


    );


  }*/
}


