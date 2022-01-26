import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Location } from '@angular/common';
import { Employee } from 'src/app/entities/employee';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  employeeDetails!:Employee;
  userDetailsFromLogin!:User;
  index: number = -1;
  employeeId: any;
  employeeData!: Employee;
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
    console.log("Employee ID:"+this.employeeId);
    // this.userDetailsFromLogin = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    // console.log("User Details from login: ", this.userDetailsFromLogin);

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
      blockStatus: ['', Validators.required],
      user:[]
    });
    this.getEmployeeData();
  }

  onClear() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.value)
    this.employeeData = this.form.value;
    this.employeeData.employeeId = this.employeeId;
    this.employeeService.updateEmployee(this.employeeData).subscribe();
    this.router.navigate(['shared/sidebar/admin/employee-details']);
  }

  getEmployeeData() { 
    this.employeeService.getEmployeeById(this.employeeId).subscribe(data=>{
      this.employeeData = data;
      console.log("Employee data here."+this.employeeData.title);
      this.form.get('title')?.setValue(this.employeeData.title);
      this.form.get('firstName')?.setValue(this.employeeData.firstName);
      this.form.get('lastName')?.setValue(this.employeeData.lastName);
      this.form.get('email')?.setValue(this.employeeData.email);
      this.form.get('dateOfBirth')?.setValue(this.employeeData.dateOfBirth);
      this.form.get('dateOfJoining')?.setValue(this.employeeData.dateOfJoining);
      this.form.get('status')?.setValue(this.employeeData.status);
      this.form.get('mobileNO')?.setValue(this.employeeData.mobileNO);
      this.form.get('address')?.setValue(this.employeeData.address);
      this.form.get('gender')?.setValue(this.employeeData.gender);
      this.form.get('qualification')?.setValue(this.employeeData.qualification);
      this.form.get('specialisation')?.setValue(this.employeeData.specialisation);
      this.form.get('blockStatus')?.setValue(this.employeeData.blockStatus);
      this.form.get('userRole')?.get('roleType')?.setValue(this.employeeData.userRole.roleType);
      this.form.get('userRole')?.get('userRoleId')?.setValue(this.employeeData.userRole.userRoleId);
    });
  }

  backToEmployeeList() {
    this.router.navigate(['shared/sidebar/admin/employee-details']);
  }
}
