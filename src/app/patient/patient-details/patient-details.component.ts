import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  hideAllergy = true;
  isRegister = false;
  isUpdate = true;
  isEdit = true;
  constructor(
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private patientService:PatientService
  ) {}
  
  form!: any;
  dateOfBirth!:Date;
  topping!:string;
  allergy!: FormArray;
  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth:[''],
      mobileNo: [''],
      gender: [''],
      race: [''],
      ethnicity: [''],
      email: [''],
      language: [''],
      address: [''],
      allergy: this.fb.array([this.addAllergy()]),
      emergencyContactDetails: this.fb.array([this.addEmergencyInfo()]),
    });
  }
  // timepass()
  // {
  //   console.log(this.topping);
  // }
   list:string[]=["Father","Mother","Son","Daughter","Other"]
   toppings = new FormControl();

   languageList: string[] = ['Marathi', 'English', 'Hindi', 'Panjabi', 'German', 'Japnies'];
  //for allergy
  addAllergy() {
    return this.fb.group({
      allergyId: [''],
      allergyType: [''],
      allergyName: [''],
      allergyDescription: [''],
      clinicalInformation: [''],
    });
  }
  get allegyArray()
  {
    return <FormArray>this.form.get('allergy');
  }
  pushAllergy() {
    this.allegyArray.push(this.addAllergy());
  }
  removeAllergy(index:any)
  {
    this.allegyArray.removeAt(index);
  }

  //for EmergencyContactInfo

  addEmergencyInfo() {
    return this.fb.group({

      firstName: [''],
      lastName: [''],
      relationship: [''],
      mobileNo: [''],
      email: [''],
      address: [''],
      access: [''],
      
    });
  }
  get emergencyArray()
  {
    return <FormArray>this.form.get('emergencyContactDetails');
  }
  pushEmergency() {
    this.emergencyArray.push(this.addEmergencyInfo());
  }
  removeEmergency(index:any)
  {
    this.emergencyArray.removeAt(index);
  }
 
  allergyFalse(event: any) {
    console.log('event');
    if (event.target.click) {
      this.hideAllergy = false;
    }
    if (!event.target.click) {
      this.hideAllergy = true;
    }
  }
  allergyTrue(event: any) {
    if (event.target.click) {
      this.hideAllergy = true;
    }
  }
  register() {
    console.log(this.form.value);
    this.patientService.submitPatientDetails(this.form.value).subscribe();
    
    this.form.reset();
    
    this.isRegister=true;
    this.isEdit=false;    

    // this._snackbar.open("Patient Details Successfully Registered","done");
    // this.isRegister=true;
    // this.isEdit=false;
    console.log('registered');
  }
  update() {
    console.log('update');
  }
  EditData() {
    console.log('edit data');
    this.isEdit = true;
    this.isUpdate = false;
  }
}
