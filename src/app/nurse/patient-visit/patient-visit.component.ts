import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Allergy } from 'src/app/entities/allergy';
import { Appointments } from 'src/app/entities/appointments';
import { Employee } from 'src/app/entities/employee';
import { Patient } from 'src/app/entities/patient';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientVisit } from 'src/app/entities/patient-visit';
import { PatientService } from 'src/app/services/patient.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
import { SchedulingService } from 'src/app/services/scheduling.service';

export interface AllergyData {
  id: string;
  allergyName: string;
  allergyType: string;
  description: string;
  information: string;
}

const ELEMENT_DATA: AllergyData[] = [
  {
    id: 'A101',
    allergyName: 'Dog',
    allergyType: 'Animal',
    description: 'Canis familiaris',
    information: 'NA',
  },
  {
    id: 'A102',
    allergyName: 'Cat',
    allergyType: 'Animal',
    description: 'Canis familiaris',
    information: 'NA',
  },
  {
    id: 'A103',
    allergyName: 'Insect',
    allergyType: 'Americal Cockroach',
    description: 'Canis familiaris',
    information: 'NA',
  },
];

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css'],
})
export class PatientVisitComponent implements OnInit {
  patient!: Patient;
  allergy: Allergy[] = [];
  pId: any;
  physicianDetails: Employee[] = [];
  patientIdList: Patient[] = [];
  personalDetailsForm!: any;
  isReadOnly: boolean = false;
  isEditButtonHide: boolean = false;
  isUpdateButtonHide: boolean = true;
  hideAllergy = true;
  allergyform!: FormGroup;
  myControl = new FormControl();
  physicanNameControl = new FormControl();
  options: string[] = ['P101', 'P102', 'P103'];
  physicianNames: string[] = [
    'Priyanka Gaykhe',
    'Amol Baykar',
    'Mansi Mishra',
    'Bhushan G',
    'Parag Gaikwad',
  ];
  filteredOptions!: Observable<string[]>;
  filteredOptions1!: Observable<string[]>;
  // for allergy table
  displayedColumns: string[] = [
    'id',
    'allergyType',
    'allergyName',
    'description',
    'information',
  ];
  displayedColumsDiagnosis: string[] = [
    'diagCode',
    'diagDescription',
    'actions',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSourceDiagnosis = new MatTableDataSource([
    { diagCode: 'A100', diagDescription: 'Cholera' },
  ]);
  @ViewChild(MatSort) sort!: MatSort;

  diagnosisCode: string[] = ['A00', 'A00.1', 'B00'];
  diagnosisId = 'None';
  drugName: string[] = ['Axc', 'Tame D', 'XYZ'];
  displayedColumsPrescription: string[] = [
    'drugName',
    'drugQuantity',
    'drugtype',
    'timing',
    'actions',
  ];
  dataSourcePrescription = new MatTableDataSource();
  drugTiming!: FormGroup;

  patientListFromRegistration!: PatientRegistration[];
  patientVisitForm!: any;
  appointementId!:any;
  appointmentDetails!: Appointments;
  appointmentDetailsForm!:any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private patientRegService: PatientRegistrationService,
    private schedulingService: SchedulingService
  ) {
    this.drugTiming = fb.group({
      morning: false,
      afternoon: false,
      evening: false,
      night: false,
    });

    this.personalDetailsForm = this.fb.group({
      patientId: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      mobileNo: [''],
      gender: [''],
      email: [''],
      address: [''],
      allergy: this.fb.array([this.addAllergy()]),
      emergencyContactDetails: this.fb.array([this.addEmergencyInfo()]),
    });

    this.patientVisitForm = this.fb.group({
      height: [''],
      weight: [''],
      bloodPressure: [''],
      bodyTemperature: [],
      respirationRate: [],
      patientId: [],
      patientName: [],
      appointment: this.fb.group({
        appointmentId: [],
      }),
      prescription: this.fb.array([this.addPrescription()]),
      diagnosis: this.fb.array([this.addDiagnosis()]),
      procedure: this.fb.array([this.addProcedure()]),
    });
  }

  addAllergy() {
    return this.fb.group({
      allergyId: [''],
      allergyType: [''],
      allergyName: [''],
      allergyDescription: [''],
      clinicalInformation: [''],
    });
  }

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

  addPrescription() {
    return this.fb.group({
      prescriptionId: [],
    });
  }

  addDiagnosis() {
    return this.fb.group({
      diagnosisId: [],
    });
  }

  addProcedure() {
    return this.fb.group({
      procedureId: [],
    });
  }

  ngOnInit(): void {
    // console.log("State from link: " , history.state.data)

    this.patientRegService.getAllPatientList().subscribe((patients) => {
      this.patientListFromRegistration = patients;
      console.log('Patient list', this.patientListFromRegistration);
    });

    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.pId = this.route.snapshot.paramMap.get('id');
      console.log('id from patient list', this.pId);

      this.patientService
        .getAllPatientDetails(this.pId)
        .subscribe((patient) => {
          this.patient = patient;
          console.log('Patient details by id:', this.patient);
          const patientDetails = this.patient;
          console.log('patientDetails:----', patientDetails);

          this.personalDetailsForm.patchValue({
            patientId: this.patient.patientId,
            firstName: this.patient.firstName,
            lastName: this.patient.lastName,
            dateOfBirth: this.patient.dateOfBirth,
            mobileNo: this.patient.mobileNo,
            gender: this.patient.gender,
            email: this.patient.email,
            address: this.patient.address,
          });

          this.isReadOnly = true;
        });
    }

    if (this.route.snapshot.paramMap.get('appointmentId') !== null) {
      this.appointementId = this.route.snapshot.paramMap.get('appointmentId');
      console.log('id from appointment list', this.appointementId);
      this.schedulingService.getAppointmentById(this.appointementId).subscribe(response =>{
        this.appointmentDetails =response;
        console.log("appointemnt details: ", this.appointmentDetails);
      })
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.filteredOptions1 = this.physicanNameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter1(value))
    );
    // if(this.myControl.valueChanges){
    //   console.log("inside first if");

    //   this.filteredOptions = this.myControl.valueChanges.pipe(
    //     startWith(''),
    //     map((value) => this._filter(value))
    //   );
    // }else if(this.physicanNameControl.valueChanges){
    //   console.log("inside else");

    //   this.filteredOptions = this.physicanNameControl.valueChanges.pipe(
    //     startWith(''),
    //     map((value) => this._filter1(value))
    //   );
    // }

    this.allergyform = new FormGroup({
      allergyId: new FormControl(null),
      allergyType: new FormControl(null),
      allergyName: new FormControl(null),
      allergyDescription: new FormControl(null),
      allergyInfo: new FormControl(null),
    });
  }

  allergyFalse(event: any) {
    console.log('event falsr');
    if (event.target.click) {
      this.hideAllergy = false;
    }
    if (!event.target.click) {
      this.hideAllergy = true;
    }
  }
  allergyTrue(event: any) {
    console.log('event true');
    if (event.target.click) {
      this.hideAllergy = true;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.physicianNames.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  clickEdit() {
    this.isEditButtonHide = true;
    this.isUpdateButtonHide = false;
    this.isReadOnly = false;
  }

  clickUpdate() {
    this.isEditButtonHide = true;
    this.isUpdateButtonHide = false;

    console.log('Form values: ' + this.personalDetailsForm.get('email').value);
    this.patient.email = this.personalDetailsForm.get('email').value;
    console.log('PAtient details after changing value : ', this.patient);

    // this.patient.firstName = this.personalDetailsForm.value.
  }
}
