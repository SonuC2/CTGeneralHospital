import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  index: number = -1;
  employeeId: any;
  // @Input() employeData!: EmployeeData;
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
      employeeId: [],
      title: [],
      firstName: [],
      lastName: [],
      email: [],
      dateOfBirth: [],
      dateOfJoining: [],
      status: [],
      mobileNO: [],
      address: [],
      gender: [],
      qualification: [],
      specialisation: [],
      userRole: [],
    });
    // this.getEmployeeData();
  }

  onClear() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.value);

    // const chec = new checking("kuldeep")

    // console.log(empUpdate);
    // if (this.employeeId === -1) {
    // this.employeeService.addEmployee(this.form.value).subscribe();
    // } else {
    this.employeeService.updateEmployee(this.form.value).subscribe();
    // }
    // Nabvigation
    // this.router.navigate(['/nurse/employee-list']);
  }

  // getEmployeeData() {
  //   let data: any = this.location.getState();
  //   console.log(data);
  //   this.form.get('employeeId')?.setValue(data.employeeId);
  //   this.form.get('title')?.setValue(data.title);
  //   this.form.get('firstName')?.setValue(data.firstName);
  //   this.form.get('lastName')?.setValue(data.lastName);
  //   this.form.get('email')?.setValue(data.email);
  //   this.form.get('dateOfBirth')?.setValue(data.dateOfBirth);
  //   this.form.get('dateOfJoining')?.setValue(data.dateOfJoining);
  //   this.form.get('status')?.setValue(data.status);
  //   this.form.get('mobileNO')?.setValue(data.mobileNO);
  //   this.form.get('address')?.setValue(data.address);
  //   this.form.get('gender')?.setValue(data.gender);
  //   this.form.get('qualification')?.setValue(data.qualification);
  //   this.form.get('specialisation')?.setValue(data.specialisation);
  //   this.form.get('roleType')?.setValue(data.roleType);
  // }

}
