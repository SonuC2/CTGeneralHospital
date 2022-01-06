import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Patient } from 'src/app/entities/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-edit-patient-detials',
  templateUrl: './edit-patient-detials.component.html',
  styleUrls: ['./edit-patient-detials.component.css']
})
export class EditPatientDetialsComponent implements OnInit {

  hideAllergy = true;
  isRegister = false;
  isUpdate = true;
  isEdit = true;
  constructor(
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private patientService:PatientService,
    private location:Location
  ) {}
  
  form!: any;
  dateOfBirth!:Date;
  topping!:string;
  allergy!: FormArray;
  firstName!:string;
  lastName!:string;
  
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
    this.data();
  }
  // timepass()
  // {
  //   console.log(this.topping);
  // }

  data()
  {
    let data:any =this.location.getState();
    this.form.get('firstName').setValue(data.firstName);
    this.form.get('lastName').setValue(data.lastName);
  }
   list:string[]=["Father","Mother","Son","Daughter","Other"]
   allergylist:string[]=["ABC","DEF","GHI","JKL","MNO"]

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
    this.patientService.setPatientIdFromTs(this.form.get('firstName').value,this.form.get('lastName').value);

   
    
    this.isRegister=true;
    this.isEdit=false;    

    // this._snackbar.open("Patient Details Successfully Registered","done");
    // this.isRegister=true;
    // this.isEdit=false;

    //recent start
   // console.log(this.form.value)
    //recent end
    console.log('registered');
    this.form.reset();
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
