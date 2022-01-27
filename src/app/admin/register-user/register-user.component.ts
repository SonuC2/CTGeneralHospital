import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Location } from '@angular/common';
import { UserRole } from 'src/app/entities/user-role';
import { Employee } from 'src/app/entities/employee';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  employeeDetails!:Employee;
  index: number = -1;
  employeeId: any;
  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public employeeService: EmployeeService,
    private location: Location
  ) {}
  specialisation: string[] = [
    'Neurologists',
    'Radiologists',
    'Anesthesiologists',
    'Psychiatrists',
    'Anesthesiologists',
    'Gynecologists',
  ];
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('index');

    this.form = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      mobileNO: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      qualification: ['', Validators.required],
      specialisation: ['', Validators.required],
      userRole:this.fb.group({
        userRoleId: [],
        roleType :['', Validators.required]
      }),
    });
  }

  onClear() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.value);
    if(this.form.get('userRole')?.get("roleType")?.value === 'Physician') {
      this.employeeDetails = this.form.value;
      this.employeeDetails.userRole.userRoleId = 1;
      this.employeeDetails.userRole.roleType = "Physician";
  
      this.employeeService.addEmployee(this.employeeDetails).subscribe();
    }
    if(this.form.get('userRole')?.get("roleType")?.value  === 'Nurse') {
      this.employeeDetails = this.form.value;
      this.employeeDetails.userRole.userRoleId = 2;
      this.employeeDetails.userRole.roleType = "Nurse";
     
      this.employeeService.addEmployee(this.employeeDetails).subscribe();
    }
    if(this.form.get('userRole')?.get("roleType")?.value  === 'Admin') {
      this.employeeDetails = this.form.value;
      this.employeeDetails.userRole.userRoleId = 4;
      this.employeeDetails.userRole.roleType = "Admin";
     
      this.employeeService.addEmployee(this.employeeDetails).subscribe();
    }
   
    this.router.navigate(['/shared/sidebar/admin/employee-details']);
  }

  
  backToEmployeeList() {
    this.router.navigate(['/shared/sidebar/admin/employee-details']);
  }
}
