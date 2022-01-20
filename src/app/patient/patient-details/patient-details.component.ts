import { Component, Input, OnInit,ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Allergy } from 'src/app/entities/allergy';
import { Patient } from 'src/app/entities/patient';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientService } from 'src/app/services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { MasterAllergyDataService } from 'src/app/services/master-allergy-data.service';
import { AllergyMasterData } from 'src/app/entities/allergy-master-data';
import {Validators} from '@angular/forms';

// export interface staticAllergyData {
//   allergyIds: string;
//   allergyTypes: string;
//   allergyNames: string;
//   allergyDescriptions: string;
//   allergyClinicalInfo:string;
// }

// const ELEMENT_DATA: staticAllergyData[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PatientDetailsComponent implements OnInit {
  PatientDataForTable: Allergy[] = [];
  dataSource = new MatTableDataSource<Allergy>();

  today = Date.now();
  time=  Date.now();

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

  
  isEditable = false;
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
  count:number=0;
  allergyTypeById!: string;
  allergyT1:string[]=[];
  allergyN1:string[]=[]; 
  constructor(
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService,
    private allergyService: MasterAllergyDataService,

  ) {}
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  form!: any;
  dateOfBirth!: Date;
  topping!: string;
  allergy!: FormArray;
  firstName: string = '';
  lastName!: string;
  setAllergyType!: string[];
  allergyMasterData!: AllergyMasterData[];
  AllergyValue!: string;
  section4=true;
  allergyForm!:any;
  varifyNew!:boolean;
  allergyArrays:Allergy[]=[];
  
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
    this.allergyForm= this.fb.group({
      allergyId: [''],
      allergyType: [''],
      allergyName: [''],
      allergyDescription: [''],
      clinicalInformation: [''],
    }),
    this.patientService.checkPatientDetailsById(this.patientDetailsFromLogin.patientId).subscribe(data=>
      {
        this.varifyNew=data;
   if(data===true)
    {
      console.log("return true")
      
      this.section4=true;
      this.section1=false;
      this.form.get('patientId').setValue(this.patientDetailsFromLogin.patientId);
      this.form.get('firstName').setValue(this.patientDetailsFromLogin.firstName);
      this.form.get('lastName').setValue(this.patientDetailsFromLogin.lastName);
      this.form.get('dateOfBirth').setValue(this.patientDetailsFromLogin.dateOfBirth);
      this.form.get('mobileNo').setValue(this.patientDetailsFromLogin.contactNumber);
      this.form.get('email').setValue(this.patientDetailsFromLogin.email);
      this.form.get('status').setValue("Active");

      

    }if(data===false){
      this.section4=false;
      this.section1=true;
    }
    
      });
    

    this.allergyService.getMasterAllergyData().subscribe((data) => {
      this.allergyMasterData = data;
    });
    this.allergyService.getAllAllergyId().subscribe((d) => {
      this.allergyI = d;
    });
    this.allergyService.getAllAllergyType().subscribe((d2) => {
      this.allergyT = d2;
    });
    this.allergyService.getAllAllergyName().subscribe((d3) => {
      this.allergyN = d3;
    });
    
  }
  
  onChange(value: any) {
      
      
    console.log('on change ' + value);
    this.allergyService.getAllergyType(value).subscribe((d) => {
      this.allergyT = d;
      console.log('type ' + d);
      this.setAllergyType = d;
    });
    this.allergyService.getAllergyName(value).subscribe((d1) => {
      this.allergyN = d1;
      console.log('name ' + d1);
    });
  
  
  }
  
  onChangeType(event: any) {
    console.log('on change Name' + event);
    this.allergyService.getAllergyNameByType(event).subscribe((d) => {
      this.allergyN = d;
      console.log('type ' + d);
      
    });
  
    
  }

  list: string[] = ['Father', 'Mother', 'Son', 'Daughter', 'Friend', 'Other'];
  allergylist: string[] = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO'];
  races: string[] = [
    'American Indian',
    'Asian',
    'Black',
    'Latino',
    'Other Pacific Islander',
    'White',
  ];
  ethnicities: string[] = [
    'Abazins',
    'Afemai',
    'Afrikaners',
    'Aja',
    'Bambara',
    'Banda',
    'Copts',
    'Garos',
    'Hazaras',
    'Isoko',
    'Japanese',
  ];
  allergyI: number[] = [
    // 'Bos d 2.0101',
    // 'Bos d 3.0101',
    // 'Can f 1.0101',
    // 'Can f 2',
    // 'Can f 2.0101',
    // 'Can f 3',
    // 'Can f 3.0101',
    // 'Can f 4.0101',
    // 'Can f 5.0101',
    // 'Can f 6.0101',
    // 'Can f 7.0101',
    // 'Cav p 1.0101',
    // 'Cav p 1.0102',
    // 'Cav p 2.0101',
    // 'Cav p 3.0101',
    // 'Equ c 1.0101',
    // 'Equ c 2.0101',
    // 'Equ c 2.0102',
    // 'Pen c 30.0101',
    // 'Pen c 32.0101',
    // 'Pen ch 13.0101',
    // 'Pen ch 18.0101',
    // 'Pen ch 20.0101',
    // 'Pen ch 35.0101',
    // 'Pen cr 26.0101',
    // 'Pen o 18.0101',
    // 'Rho m 1.0101',
    // 'Rho m 2.0101',
    // 'Sch c 1.0101',
    // 'Sta 3.0101',
    // 'NA-12',
    // 'NA-13',
    // 'NA-14',
  ];
  allergyT: string[] = [
    // 'Animal',
    // 'Fungi',
    // 'Insect',
    // 'Mite',
    // 'Plant',
    // 'Bacteria skin',
    // 'Parasite',
    // 'Drug',
    // 'Food',
    // 'Venom or Salivary',
  ];
  allergyN: string[] = [
    // 'Juniper',
    // 'Red cedar',
    // 'summer cypress',
    // 'Privet',
    // 'Perennial ryegrass',
    // 'Annual mercury grass',
    // 'Olive tree',
    // 'Rice',
    // 'European hop hornbeam',
    // 'Parthenium hysterophorus',
    // 'Weed',
    // 'Bahia grass',
    // 'Canary grass',
    // 'Common timothy',
    // 'Date palm',
    // 'Common timothy',
    // 'Siberian hamster',
    // 'London plane tree',
    // 'Narrow-leaved plantain',
    // 'oriental plane',
    // 'Kentucky bluegrass',
    // 'mesquite',
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

  submitAllergy()
  {
    console.log("hi"+this.allergyArrays);
    this.patientService.addAllergy(this.patientDetailsFromLogin.patientId,this.allergyArrays).subscribe();
    this.section1=true;
    this.section4=false;
  }
  get allegyArray() {
    return <FormArray>this.form.get('allergy');
  }
  pushAllergy() {
    // this.allegyArray.push(this.allergyForm.value);
    console.log(this.allergyForm.value);
    this.allergyArrays.push(this.allergyForm.value);
    //this.patientService.addAllergy(this.allergyForm.value).subscribe();
    this.allergyForm.reset();
    
  }
  removeAllergy(index: any) {
    this.allegyArray.removeAt(index);
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

  submitDetails() {
    console.log(this.form.value);
    this.patientData = this.form.value;
    this.patientEmail = this.form.email;
    this.patientService.submitPatientDetails(this.form.value).subscribe();
    // this.patientService.getHerePatientDataFromPatientDetails(this.form.value);
    // this.section1 = true;
    // this.section2 = false;
    // this.section4=false;
    this.patientData = this.form.value;
    this.isRegister = true;
    this.submitData = true;
    this.updateData = false;
    this.headingAllergy = true;
    this.isEdit = false;
    // this.PatientDataForTable = this.form.get('allergy').value;
    // this.dataSource.data = this.PatientDataForTable;
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

  chackBox() {
    console.log('checkbox');
    this.paddress = this.form.get('address').value;
    this.form
      .get('emergencyContactDetails')
      .get('address')
      .setValue(this.paddress);
  }
}
