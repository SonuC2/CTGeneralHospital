import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  form !:any;

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      title:[],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      profile: ['', [Validators.required, Validators.minLength(10)]],
      mobileNO: ['', Validators.required],
      address: ['', Validators.required],
      qualification: ['', Validators.required],
      specialisation: ['', Validators.required],
      status: ['', Validators.required],
      allergy: this.formBuilder.array([this.addUserRole()]),
    });
  }


  addUserRole() {
    return this.formBuilder.group({
      userRoleId: [''],
      roleType: [''],
    });
  }
  ngOnInit(): void {
  }

}
