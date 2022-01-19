import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SavedialogComponent } from '../savedialog/savedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { UserRole } from 'src/app/entities/user-role';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user.service';
import { Employee } from 'src/app/entities/employee';
import { EmployeeService } from 'src/app/services/employee.service';
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
    { value: 'Mr.', viewValue: 'Mr.' },
    { value: 'Ms.', viewValue: 'Ms.' },
    { value: 'Mrs.', viewValue: 'Mrs.' },
    { value: 'Dr.', viewValue: 'Dr.' },
  ];
  selectedValue: string | undefined;
  isFormShown: boolean = false;

  isRegFormShown: boolean = false;
  submitted = false;
  errorMessage!:any;
  patientDetails!:PatientRegistration;
  employeeDetailsFromLogin!:Employee;

  patientRegistration !: PatientRegistration;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService:UserService,
   private patientregistrationService: PatientRegistrationService,
   private employeeService: EmployeeService,
   private route: ActivatedRoute
  ) {}
  registerForm!: any;
  loginForm!:any;
  userDetails!:User;
  dateOfBirth!: Date;
  ngOnInit(): void {
    // this.registerForm = this.fb.group({
    //   title: ['',Validators.required],
    //   firstName: ['',Validators.required],
    //   lastName: ['',Validators.required],
    //   email: ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    //   dateOfBirth: ['',Validators.required],
    //   contactNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    //   password: ['',[Validators.required,Validators.minLength(8)]],
    //   confirmPassword: ['', Validators.required]},
    //   // { 
    //   //   validator: this.ConfirmedValidator('password', 'confirm_password')
    //   // }
    // );

    this.registerForm = this.fb.group({
      title: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      dateOfBirth: [''],
      contactNumber: [''],
      password: [''],
      confirmPassword: [''],
      createdBy:[''],
      userRole: this.fb.group({
        userRoleId:3,
        roleType:"Patient"
      })
,
      // { 
      //   validator: this.ConfirmedValidator('password', 'confirm_password')
      // }
    });

    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
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

    console.log(this.registerForm.value);
  //   if (this.registerForm.invalid) {
  //     return;
  // }
  const userRole : UserRole= {
    "userRoleId": 3,
    "roleType" :"Patient"
  }
  // this.patientRegistration.title = this.registerForm.controls.title.value;
  // this.patientRegistration.firstName = this.registerForm.controls.firstName.value;
  // this.patientRegistration.lastName =  this.registerForm.controls.lastName.value;
  // this.patientRegistration.contactNumber = this.registerForm.controls.contactNumber.value;
  // this.patientRegistration.dateOfBirth = this.registerForm.controls.dateOfBirth.value;
  // this.patientRegistration.email = this.registerForm.control.emails.value;
  // this.patientRegistration.password = this.registerForm.controls.password.value;
  // this.patientRegistration.userRole = userRole;
  // console.log("PAtient registration data: " , this.patientRegistration)
   this.patientregistrationService.registerPatient(this.registerForm.value).subscribe();
  }

  login(){
    console.log("login form: ",this.loginForm.value)
    this.userService.login(this.loginForm.value).subscribe((response) =>{
      console.log("Response received", response)
      this.userDetails = response;
      sessionStorage.setItem('userDetails', JSON.stringify(this.userDetails));

      if( this.userDetails.userRoleId.roleType === "Physician"){
        console.log("Physician logs in")
        this.router.navigate(['/shared/sidebar/doctor'])
        this.employeeService.getEmployeeDetailsByUserId(this.userDetails.userId).subscribe((emploeeDetails =>{
          this.employeeDetailsFromLogin = emploeeDetails;
          sessionStorage.setItem('physicianDetailsFromLogin', JSON.stringify(this.employeeDetailsFromLogin));

        }))
      }

      if(this.userDetails.userRoleId.roleType === "Nurse"){
        console.log("Nurse logs in")
        this.router.navigate(['/shared/sidebar/nurse'])
        this.employeeService.getEmployeeDetailsByUserId(this.userDetails.userId).subscribe((emploeeDetails =>{
          this.employeeDetailsFromLogin = emploeeDetails;
          sessionStorage.setItem('nurseDetailsFromLogin', JSON.stringify(this.employeeDetailsFromLogin));

        }))
      }
  
      if(this.userDetails.userRoleId.roleType === "Patient"){
        console.log("Patient logs in")
        this.router.navigate(['/shared/sidebar/patient'])
        this.patientregistrationService.getPatientDetailsByUserId(this.userDetails.userId).subscribe((patientDetails =>{
          this.patientDetails = patientDetails;
          sessionStorage.setItem('patientDetails', JSON.stringify(this.patientDetails));

        }))

      }

      if(this.userDetails.userRoleId.roleType === "Admin"){
        console.log("Patient logs in")
        this.router.navigate(['/shared/sidebar/admin'])
        this.employeeService.getEmployeeDetailsByUserId(this.userDetails.userId).subscribe((emploeeDetails =>{
          this.employeeDetailsFromLogin = emploeeDetails;
          sessionStorage.setItem('adminDetailsFromLogin', JSON.stringify(this.employeeDetailsFromLogin));

        }))

      }
    },
    (error) =>{
      
      this.errorMessage = error;
      console.error('error caught in component', this.errorMessage)
      console.log(this.errorMessage)
    });

    
  }
}
