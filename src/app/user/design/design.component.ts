import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee';
import { Password } from 'src/app/entities/password';
import { User } from 'src/app/entities/user';
import { matchValidator } from 'src/app/services/password-validator.service';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
})
export class DesignComponent implements OnInit {
  // isFormShown:boolean=false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private passwordService: PasswordService
  ) {}
  form!: any;
  email!: any;
  checkOldPassword!:string;
  userDetails!:User;
  submitted=false;
  msgFromBackend!: String;
  employeeDetailsFromLogin!: Employee;
  listOfPassword!: Password[];
  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    console.log('email from loggedIN:', this.email);
    this.form = this.fb.group({
      
      email: [this.email],
      oldpassword: [''],
      newPassword: [
        '',
        [
          Validators.required,

          Validators.minLength(6),

          matchValidator('password', true),
        ],
      ],
      password: [
        '',
        [
          Validators.required,

          Validators.minLength(6),

          matchValidator('newPassword', ),
        ],
      ],
    });
    this.userDetails=JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    console.log("userDetails :"+this.userDetails.userRoleId.roleType)
    console.log("userDetails :"+this.userDetails.password)


  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get formControl()
  {
    return this.form.controls;
  }
  onChangepassword() {
    // this.isFormShown=true;
  }
  submitPassword() {

    if(this.userDetails.password===this.form.get('oldpassword').value)
    {
    this.form.get('oldpassword').setValue('');
    this.form.get('newPassword').setValue('');
    this.passwordService.changePassword(this.form.value).subscribe();
    
    //hello
    this.form.reset();
    if(this.userDetails.userRoleId.roleType==="Patient")
    {
      this.router.navigate(['/shared/sidebar/patient']);
    }
    else if(this.userDetails.userRoleId.roleType==="Physician")
    {
      this.router.navigate(['/shared/sidebar/doctor']);

    }
    else if(this.userDetails.userRoleId.roleType==="Nurse")
    {
      this.router.navigate(['/shared/sidebar/nurse']);

    }
    else if(this.userDetails.userRoleId.roleType==="Admin")
    {
      this.router.navigate(['/shared/sidebar/admin/home']);

    }
    }
    else{
      window.alert("please enter currect old password")
    }
    // this.router.navigate(['']);
  }
  hello(event: any) {
    console.log('hi');
  }
}
