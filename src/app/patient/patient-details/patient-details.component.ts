import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Patient } from 'src/app/entities/patient';
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
  submitData = false;
  updateData = true;
  headingAllergy = false;
  patientEmail:string="";
  patientData!:Patient;
  section1=false;
  section2=true;
  section3=true;
  updateId!:number;
  paddress:string="";
  eaddress:string="";
  constructor(
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService
  ) {}

  form!: any;
  dateOfBirth!: Date;
  topping!: string;
  allergy!: FormArray;
  firstName: string="";
  lastName!: string;
  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      mobileNo: [''],
      gender: [''],
      race: [''],
      ethnicity: [''],
      email: [''],
      language: [''],
      address: [''],
      allergy: this.fb.array([this.addAllergy()]),
      emergencyContactDetails: this.fb.group({
        firstName: [''],
        lastName: [''],
        relationship: [''],
        mobileNo: [''],
        email: [''],
        address: [''],
        access: [''],
      }),
    });
  }
  // timepass()
  // {
  //   console.log(this.topping);
  // }
  list: string[] = ['Father', 'Mother', 'Son', 'Daughter', 'Other'];
  allergylist: string[] = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO'];

  toppings = new FormControl();

  languageList: string[] = [
    'Marathi',
    'English',
    'Hindi',
    'Panjabi',
    'German',
    'Japnies',
  ];
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
  get allegyArray() {
    return <FormArray>this.form.get('allergy');
  }
  pushAllergy() {
    this.allegyArray.push(this.addAllergy());
  }
  removeAllergy(index: any) {
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
  get emergencyArray() {
    return <FormArray>this.form.get('emergencyContactDetails');
  }
  pushEmergency() {
    this.emergencyArray.push(this.addEmergencyInfo());
  }
  removeEmergency(index: any) {
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

  filladdress(e:any)
  {
    console.log('checkbox');

    if(e.target.checked==true)
    {
      this.paddress=this.eaddress;
    }
    else(e.target.checked==false)
    {
      this.eaddress="";
    }
  }
  submitDetails() {
    console.log(this.form.value);
    this.patientData=this.form.value;
    this.patientEmail=this.form.email;
    this.patientService.submitPatientDetails(this.form.value).subscribe();
    // this.patientService.setPatientIdFromTs(
    //   this.form.get('firstName').value,
    //   this.form.get('lastName').value
    // );
    this.firstName=this.form.get('firstName').value;
    this.section1=true;
    this.section2=false;
    this.patientData=this.form.value;
    this.isRegister = true;
    this.submitData = true;
    this.updateData = false;
    this.headingAllergy = true;
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
  secondSection()
  {
    this.section2=true;
    this.section3=false;
    this.form.get('firstName').setValue(this.patientData.firstName);
    this.form.get('lastName').setValue(this.patientData.lastName);
    this.form.get('dateOfBirth').setValue(this.patientData.dateOfBirth);
    this.form.get('mobileNo').setValue(this.patientData.mobileNo);
    this.form.get('gender').setValue(this.patientData.gender);
    this.form.get('race').setValue(this.patientData.race);
    this.form.get('ethnicity').setValue(this.patientData.ethnicity);
    this.form.get('email').setValue(this.patientData.email);
    this.form.get('language').setValue(this.patientData.language);
    this.form.get('address').setValue(this.patientData.address);
    this.form.get('emergencyContactDetails').get('firstName').setValue(this.patientData.emergencyContactDetails.firstName);
    this.form.get('emergencyContactDetails').get('lastName').setValue(this.patientData.emergencyContactDetails.lastName);
    this.form.get('emergencyContactDetails').get('relationship').setValue(this.patientData.emergencyContactDetails.ralationship);
    this.form.get('emergencyContactDetails').get('mobileNo').setValue(this.patientData.emergencyContactDetails.mobileNo);
    this.form.get('emergencyContactDetails').get('email').setValue(this.patientData.emergencyContactDetails.email);
    this.form.get('emergencyContactDetails').get('address').setValue(this.patientData.emergencyContactDetails.address);
    this.form.get('emergencyContactDetails').get('access').setValue(this.patientData.emergencyContactDetails.access);
    this.patientData=this.form.value;

  }
  updateDetails() {
    console.log('edit data');
    this.patientData=this.form.value;

    // this.patientService.getPatientDataByEmail(this.patientEmail).subscribe(data=>{
    //   this.patientData=data;
    // })
    // this.form.get("firstName").setValue(this.patientData.firstName);
  
    // this.isEdit = true;
    // this.isUpdate = false;
    this.section2=false;
    this.section3=true;
    console.log(this.form.value);
    this.patientService.getPatientIdByFirstNameLastNameAndEmail(this.form.value).subscribe(id=>
      {
        let updateId=id;
        console.log(updateId);
        this.patientService.updatePatientById(this.form.value,updateId).subscribe();

      });

  }
}
