import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { Allergy } from 'src/app/entities/allergy';
import { Patient } from 'src/app/entities/patient';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientService } from 'src/app/services/patient.service';
//import * as XLXS from 'xlsx';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css'],
})
export class MyDetailsComponent implements OnInit {

  PatientDataForTable: Allergy[] = [];
  dataSource = new MatTableDataSource<Allergy>();
  block1=false;
  block2=true;
  today=new Date;
  displayedColumns: string[] = [
    'AllergyId',
    'AllergyType',
    'AllergyName',
    'AllergyDescription',
    'ClinicalInformation',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hideAllergy = true;
  isRegister = false;
  isUpdate = true;
  isEdit = true;
  submitData = false;
  updateData = true;
  headingAllergy = false;
  patientEmail: string = '';
  patientData!: Patient;
  section1 = false;
  section2 = true;
  section3 = true;
  updateId!: number;
  paddress: string = '';
  eaddress: string = '';
  patientDetailsFromLogin!:PatientRegistration;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService,public location:Location) {}form!: any;
    dateOfBirth!: Date;
    topping!: string;
    allergy!: FormArray;
    firstName: string = '';
    lastName!: string;
    ngOnInit(): void {

    this.patientDetailsFromLogin = JSON.parse(sessionStorage.getItem('patientDetails') || '{}');
    console.log("PAtient Details from login: ", this.patientDetailsFromLogin);

      this.form = this.fb.group({
        patientId:[],
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
        status: [''],
        userRole: this.fb.group({
          userRoleId:[3],
          roleType: ['Patient'],
        }),
        allergy: this.fb.array([this.addAllergy()]),
        emergencyContactDetails: this.fb.group({
          firstName: [''],
          lastName: [''],
          ralationship: [''],
          mobileNo: [''],
          email: [''],
          address: [''],
          access: [''],
        }),
      });
      
       let d:any=this.location.getState();
       this.patientData=d;
       this.patientService.getPatientDetailsById(this.patientDetailsFromLogin.patientId).subscribe(d=>
        {
          this.patientData=d;
          this.PatientDataForTable = d.allergy;
        console.log('welocome to allergy mapping');
        this.dataSource.data = this.PatientDataForTable;
        })
       
      // this.getDataPatientDetails();
      

      // this.patientData= this.patientService.sendDataToPatientDetailsTs();
      // console.log( "this is from patientDetailsTs "+this.patientData.firstName);
      // this.patientService
      // .getPatientDataByFirstNameAndEmail(this.patientData)
      // .subscribe((allergy) => {
      //   this.PatientDataForTable = allergy;
      //   console.log('welocome to allergy mapping');
      //   this.dataSource.data = this.PatientDataForTable;
      //   console.log('Data source : ', this.dataSource.data);
      // });
      
    }
    // timepass()
    // {
    //   console.log(this.topping);
    // }
    list: string[] = ['Father', 'Mother', 'Son', 'Daughter', 'Other'];
    allergylist: string[] = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO'];
    races:string[]=["American Indian","Asian","Black","Latino","Other Pacific Islander","White"];
    ethnicities:string[]=["Abazins","Afemai","Afrikaners","Aja","Bambara","Banda","Copts","Garos","Hazaras","Isoko","Japanese"]
    allergyI: string[] = [
    'Bos d 2.0101',
    'Bos d 3.0101',
    'Can f 1.0101',
    'Can f 2',
    'Can f 2.0101',
    'Can f 3',
    'Can f 3.0101',
    'Can f 4.0101',
    'Can f 5.0101',
    'Can f 6.0101',
    'Can f 7.0101',
    'Cav p 1.0101',
    'Cav p 1.0102',
    'Cav p 2.0101',
    'Cav p 3.0101',
    'Equ c 1.0101',
    'Equ c 2.0101',
    'Equ c 2.0102',
    'Pen c 30.0101',
    'Pen c 32.0101',
    'Pen ch 13.0101',
    'Pen ch 18.0101',
    'Pen ch 20.0101',
    'Pen ch 35.0101',
    'Pen cr 26.0101',
    'Pen o 18.0101',
    'Rho m 1.0101',
    'Rho m 2.0101',
    'Sch c 1.0101',
    'Sta 3.0101',
    'NA-12',
    'NA-13',
    'NA-14',
  ];
  allergyT: string[] = [
    'Animal',
    'Fungi',
    'Insect',
    'Mite',
    'Plant',
    'Bacteria skin',
    'Parasite',
    'Drug',
    'Food',
    'Venom or Salivary',
  ];
  allergyN: string[] = [
    'Juniper',
    'Red cedar',

    'summer cypress',

    'Privet',
    'Perennial ryegrass',
    'Annual mercury grass',
    'Olive tree',
    'Rice',
    'European hop hornbeam',
    'Parthenium hysterophorus',
    'Weed',
    'Bahia grass',
    'Canary grass',
    'Common timothy',
    'Date palm',

    'Common timothy',
    'Siberian hamster',
    'London plane tree',

    'Narrow-leaved plantain',

    'oriental plane',
    'Kentucky bluegrass',
    'mesquite',
  ];
    toppings = new FormControl();
  
    languageList: string[] = [
      'Marathi',
      'English',
      'Hindi',
      'Panjabi',
      'German',
      'Japnies',
    ];

    downloadDetails()
    {
      this.router.navigate(['/shared/sidebar/patient/get-my-data']);
    }
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
  
    autoFilAddress() {
      console.log('checkbox');
  
      var checkBox= document.getElementById('checkBox');
  
      
    }

    // ---letest coding--

    getDataPatientDetails()
    {
      let data:any=this.location.getState();
      this.patientData=data;
      this.patientService
        .getPatientDataByFirstNameAndEmail(this.patientData)
        .subscribe((allergy) => {
          this.PatientDataForTable = allergy;
          console.log('welocome to allergy mapping');
          this.dataSource.data = this.PatientDataForTable;
          console.log('Data source : ', this.dataSource.data);
        });
    }
  getfirstData()
  {
    this.patientService.getPatientDetails().subscribe(da=>{
      this.patientData=da;
      this.dataSource.data = this.patientData.allergy;
    });
  }

  chackBox(){
    console.log("checkbox")
    this.paddress=this.form.get('address').value;
    this.form.get('emergencyContactDetails').get('address').setValue(this.paddress);
  }
    submitDetails() {
      console.log(this.form.value);
      this.patientData = this.form.value;
      this.patientEmail = this.form.email;
      this.patientService.submitPatientDetails(this.form.value).subscribe();
      // this.patientService.setPatientIdFromTs(
      //   this.form.get('firstName').value,
      //   this.form.get('lastName').value
      // );
      
  
      this.section1 = true;
      this.section2 = false;
      this.patientData = this.form.value;
      this.isRegister = true;
      this.submitData = true;
      this.updateData = false;
      this.headingAllergy = true;
      this.isEdit = false;
      // this._snackbar.open("Patient Details Successfully Registered","done");
      // this.isRegister=true;
      // this.isEdit=false;
  
      //recent start
      // console.log(this.form.value)
      //recent end
      console.log('registered');
      // this.patientService
      //   .getPatientDataByFirstNameAndEmail(this.form.value)
      //   .subscribe((allergy) => {
      //     this.PatientDataForTable = allergy;
      //     console.log('welocome to allergy mapping');
      //     this.dataSource.data = this.PatientDataForTable;
      //     console.log('Data source : ', this.dataSource.data);
      //   });
        
    }
    update() {
      console.log('update');
    }
    secondSection() {
      this.block1 = true;
      this.block2 = false;
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
      this.form
        .get('emergencyContactDetails')
        .get('firstName')
        .setValue(this.patientData.emergencyContactDetails.firstName);
      this.form
        .get('emergencyContactDetails')
        .get('lastName')
        .setValue(this.patientData.emergencyContactDetails.lastName);
      this.form
        .get('emergencyContactDetails')
        .get('ralationship')
        .setValue(this.patientData.emergencyContactDetails.ralationship);
      this.form
        .get('emergencyContactDetails')
        .get('mobileNo')
        .setValue(this.patientData.emergencyContactDetails.mobileNo);
      this.form
        .get('emergencyContactDetails')
        .get('email')
        .setValue(this.patientData.emergencyContactDetails.email);
      this.form
        .get('emergencyContactDetails')
        .get('address')
        .setValue(this.patientData.emergencyContactDetails.address);
      this.form
        .get('emergencyContactDetails')
        .get('access')
        .setValue(this.patientData.emergencyContactDetails.access);
      this.patientData = this.form.value;
    }
    updateDetails() {
      console.log('edit data');
      this.patientData = this.form.value;
  
      // this.patientService.getPatientDataByEmail(this.patientEmail).subscribe(data=>{
      //   this.patientData=data;
      // })
      // this.form.get("firstName").setValue(this.patientData.firstName);
  
      // this.isEdit = true;
      // this.isUpdate = false;
      this.block1 = false;
      this.block2 = true;
      console.log(this.form.value);
      this.patientService
        .getPatientIdByFirstNameLastNameAndEmail(this.form.value)
        .subscribe((id) => {
          let updateId = id;
          console.log(updateId);
          this.patientService
            .updatePatientById(this.form.value, updateId)
            .subscribe();
        });
    }
  }
  