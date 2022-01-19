import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  personalDetailsForm!: any;
  patientDetails!: PatientRegistration;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientRegistrationService: PatientRegistrationService) { 

    this.personalDetailsForm = this.fb.group({
      patientId: [''],
      title:[''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      contactNumber: [''],
      gender: [''],
      email: [''],
      createdBy:[6],
      password:[''],
      userRole:this.addUserRole(),
    });

  }

  addUserRole(){
    return this.fb.group({
      userRoleId: [3],
      roleType :['Patient']
    });
  }
  ngOnInit(): void {
  }

  registerPatient(){
    console.log(this.personalDetailsForm.value); 
    this.patientDetails = this.personalDetailsForm.value; 
    this.patientRegistrationService.registerPatient( this.patientDetails).subscribe();
  }

}
