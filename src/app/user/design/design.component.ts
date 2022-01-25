import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee';
import { Password } from 'src/app/entities/password';
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
    private passwordService:PasswordService
  ) {}
  form!: any;
  email!: any;
  msgFromBackend!:String;
  employeeDetailsFromLogin!: Employee;
  listOfPassword!:Password[];
  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    console.log('email from loggedIN:', this.email);
    this.form = this.fb.group({
      password: [''],
      email: [this.email],
      oldpassword:[''],
      newPassword:['']
    });
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
   // this.router.navigate(['']);
  }
  hello(event:any)
  {
    console.log("hi")
  }
}
