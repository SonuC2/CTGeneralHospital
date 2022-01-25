import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee';
import { Password } from 'src/app/entities/password';
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
    this.form.get('oldpassword').setValue('');
    this.form.get('newPassword').setValue('');
    this.passwordService.changePassword(this.form.value).subscribe();

    //hello
    this.form.reset();
    
      this.router.navigate(['/shared/sidebar']);
    
    // this.router.navigate(['']);
  }
  hello(event: any) {
    console.log('hi');
  }
}
