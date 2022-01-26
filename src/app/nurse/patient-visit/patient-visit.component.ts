import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, startWith } from 'rxjs';
import { Allergy } from 'src/app/entities/allergy';
import { Appointments } from 'src/app/entities/appointments';
import { Diagnosis } from 'src/app/entities/diagnosis';
import { Employee } from 'src/app/entities/employee';
import { Medication } from 'src/app/entities/medication';
import { Patient } from 'src/app/entities/patient';
import { PatientRegistration } from 'src/app/entities/patient-registration';
import { PatientVisit } from 'src/app/entities/patient-visit';
import { Prescription } from 'src/app/entities/prescription';
import { Procedure } from 'src/app/entities/procedure';
import { User } from 'src/app/entities/user';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { MedicationService } from 'src/app/services/medication.service';
import { PatientVisitService } from 'src/app/services/patient-visit.service';
import { PatientService } from 'src/app/services/patient.service';
import { PatientRegistrationService } from 'src/app/services/patientRegistration.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { ProcedureService } from 'src/app/services/procedure.service';
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
  regPatient!: PatientRegistration;
  selectedPatientId!: any;
  // options: string[] = ['P101', 'P102', 'P103'];
  // physicianNames: string[] = [
  //   'Priyanka Gaykhe',
  //   'Amol Baykar',
  //   'Mansi Mishra',
  //   'Bhushan G',
  //   'Parag Gaikwad',
  // ];
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
  dataSourceDiagnosis = new MatTableDataSource<Diagnosis>();
  displayedColumsProcedure: string[] = ['proCode', 'proDescription', 'actions'];

  dataSourceProcedure = new MatTableDataSource<Procedure>();
  medicationForm!: any;
  displayedColumsMedication: string[] = ['drugID', 'drugName', 'actions'];
  dataSourceMedication = new MatTableDataSource<Medication>();
  displayedColumsPrescription: string[] = [
    'drugName',
    'drugQuantity',
    'drugtype',
    'timing',
    'actions',
  ];
  dataSourcePrescription = new MatTableDataSource();
  drugTiming!: FormGroup;

  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  // diagnosisCode: string[] = ['A00', 'A00.1', 'B00'];
  // diagnosisId = 'None';
  drugName: string[] = ['Axc', 'Tame D', 'XYZ'];

  patientListFromRegistration!: PatientRegistration[];
  patientVisitForm!: any;
  appointementId!: any;
  appointmentDetails!: Appointments;
  appointmentDetailsForm!: any;
  patientVisitDetails!: PatientVisit;
  diagnosisArray: Diagnosis[] = [];
  procedureArray: Procedure[] = [];
  prescriptionArray: Prescription[] = [];
  diagnosisForm!: any;
  procedureForm!: any;
  prescriptionForm!: any;
  diagnosisDetails!: Diagnosis[];
  prescriptionDetails!: Prescription[];
  procedureDetails!: Procedure[];
  medicationDetails!: Medication[];
  selectedDiagnosis!: Diagnosis;
  selectedProcedure!: Procedure;
  selectedMedication!: Medication;
  medicationArray: Medication[] = [];
  timingList: string[] = ['Morning', 'Afternoon', 'Night'];
  userDetailsFromLogin!: User;
  patientVisitDetailsFromDb!: PatientVisit;
  isAddButtonDisabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private patientRegService: PatientRegistrationService,
    private schedulingService: SchedulingService,
    private diagnosisService: DiagnosisService,
    private procedureService: ProcedureService,
    private medicationService: MedicationService,
    private prescriptionService: PrescriptionService,
    private patientVisitService: PatientVisitService
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
      visitStatus: [],
      // prescription: this.fb.array([this.addPrescription()]),
      // diagnosis: this.fb.array([this.addDiagnosis()]),
      // procedure: this.fb.array([this.addProcedure()]),
    });

    this.appointmentDetailsForm = this.fb.group({
      meetingTitle: [],
      employeeName: [],
      appointmentDate: [],
      timeSlotString: [],
      patientId: [],
      patientName: [],
      appointmentStatus: [],
      appointementId: [],
    });

    this.diagnosisForm = this.fb.group({
      diagnosisId: [],
      diagnosisCode: [],
      diagnosisDescription: [],
      diagnosisIsDepricated: [],
    });

    this.procedureForm = this.fb.group({
      procedureId: [],
      procedureCode: [],
      procedureDescription: [],
      procedureIsDepricated: [],
    });

    this.medicationForm = this.fb.group({
      drugNo: [''],
      drugID: [''],
      drugName: [''],
    });

    this.prescriptionForm = this.fb.group({
      prescriptionId: [],
      quantity: [],
      type: [],
      timing: [],
      medication: this.fb.group({
        drugNo: [],
        drugID: [],
        drugName: [],
      }),
      appointmentId: [],
      patientVisit: this.fb.group({
        patientVisitId: [],
      }),
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

  ngOnInit(): void {
    // console.log("State from link: " , history.state.data)

    this.userDetailsFromLogin = JSON.parse(
      sessionStorage.getItem('userDetails') || '{}'
    );
    console.log('User Details from login: ', this.userDetailsFromLogin);

    this.patientRegService.getAllPatientList().subscribe((patients) => {
      this.patientListFromRegistration = patients;
      console.log('Patient list', this.patientListFromRegistration);
    });

    this.diagnosisService.getAllDiagnosis().subscribe((diagnosis) => {
      this.diagnosisDetails = diagnosis;
      console.log('Diagnosis details: ', this.diagnosisDetails);
    });

    this.procedureService.getAllProcedure().subscribe((procedure) => {
      this.procedureDetails = procedure;
      console.log('Procedure details:', this.procedureDetails);
    });

    this.medicationService.getAllMedication().subscribe((response) => {
      this.medicationDetails = response;
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
      this.schedulingService
        .getAppointmentById(this.appointementId)
        .subscribe((response) => {
          this.appointmentDetails = response;
          console.log('appointemnt details: ', this.appointmentDetails);

          this.selectedPatientId = this.appointmentDetails.patientId;
          console.log(
            'Patietn id inside service call:',
            this.selectedPatientId
          );
          this.appointmentDetailsForm.patchValue({
            meetingTitle: this.appointmentDetails.meetingTitle,
            employeeName: this.appointmentDetails.employeeName,
            appointmentDate: moment(
              this.appointmentDetails.appointmentDate
            ).format('DD-MM-YYYY'),
            timeSlotString: this.appointmentDetails.timeSlotString,
            patientId: this.appointmentDetails.patientId,
            patientName: this.appointmentDetails.patientName,
            appointmentStatus: this.appointmentDetails.appointmentStatus,
            appointementId: this.appointementId,
          });

          this.patientRegService
            .getPatientDetailsByPatientId(this.selectedPatientId)
            .subscribe((patient) => {
              this.regPatient = patient;
              console.log('Patient details by id:', this.regPatient);
              const patientDetails = this.regPatient;
              console.log('patientDetails:----', patientDetails);

              this.personalDetailsForm.patchValue({
                patientId: this.regPatient.patientId,
                firstName: this.regPatient.firstName,
                lastName: this.regPatient.lastName,
                dateOfBirth: this.regPatient.dateOfBirth,
                mobileNo: this.regPatient.contactNumber,
                email: this.regPatient.email,
              });

              this.isReadOnly = true;
            });
        });

      //it was getAllPatientDetails
      this.patientRegService
        .getPatientDetailsByPatientId(this.selectedPatientId)
        .subscribe((patient) => {
          this.regPatient = patient;
          console.log('Patient details by id:', this.regPatient);
          const patientDetails = this.regPatient;
          console.log('patientDetails:----', patientDetails);

          this.personalDetailsForm.patchValue({
            patientId: this.regPatient.patientId,
            firstName: this.regPatient.firstName,
            lastName: this.regPatient.lastName,
            dateOfBirth: this.regPatient.dateOfBirth,
            mobileNo: this.regPatient.contactNumber,
            email: this.regPatient.email,
          });

          this.isReadOnly = true;
        });
    }
    console.log('Patietn id:', this.selectedPatientId);
    this.patientRegService
      .getPatientDetailsByPatientId(this.selectedPatientId)
      .subscribe((patient) => {
        this.regPatient = patient;
        console.log('Patient details by id:', this.regPatient);
        const patientDetails = this.regPatient;
        console.log('patientDetails:----', patientDetails);

        this.personalDetailsForm.patchValue({
          patientId: this.regPatient.patientId,
          firstName: this.regPatient.firstName,
          lastName: this.regPatient.lastName,
          dateOfBirth: this.regPatient.dateOfBirth,
          mobileNo: this.regPatient.contactNumber,
          email: this.regPatient.email,
        });

        this.isReadOnly = true;
      });

    // this.filteredOptiaddPatientVisitons = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value))
    // );

    // this.filteredOptions1 = this.physicanNameControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter1(value))
    // );
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

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return .filter((option) =>
  //     option.toLowerCase().includes(filterValue)
  //   );
  // }

  // private _filter1(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   // return this.physicianNames.filter((option) =>
  //   //   option.toLowerCase().includes(filterValue)
  //   // );
  // }

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

  loadDiagnosisDescription(diagnosis: Diagnosis, event: any) {
    if (event.isUserInput) {
      console.log('selected diagnosis: ', diagnosis);
      this.diagnosisService
        .getDiagnosisDescriptionByCode(diagnosis.diagnosisCode)
        .subscribe((response) => {
          this.selectedDiagnosis = response;
          this.diagnosisForm
            .get('diagnosisDescription')
            .setValue(response.diagnosisDescription);
        });
    }
  }

  addDiagnosis() {
    console.log('Diagnosis form data', this.diagnosisForm.value);
    console.log('selected diagnosis: ', this.selectedDiagnosis);
    this.diagnosisArray.push(this.selectedDiagnosis);
    //this.patientService.addAllergy(this.allergyForm.value).subscribe();
    this.diagnosisForm.reset();

    this.dataSourceDiagnosis.data = this.diagnosisArray;
    console.log('dataSourceDiagnosis', this.dataSourceDiagnosis.data);
  }

  loadProcedureDescription(procedure: Procedure, event: any) {
    if (event.isUserInput) {
      console.log('selected procedure: ', procedure);
      this.procedureService
        .getProcedureDescriptionByCode(procedure.procedureCode)
        .subscribe((response) => {
          this.selectedProcedure = response;
          this.procedureForm
            .get('procedureDescription')
            .setValue(response.procedureDescription);
        });
    }
  }

  loadMedicationDetails(medication: Medication, event: any) {
    if (event.isUserInput) {
      console.log('selected medication: ', medication);
      this.medicationService
        .getDrugDetailsByDrugId(medication.drugNo)
        .subscribe((response) => {
          this.selectedMedication = response;
          this.medicationForm.get('drugName')?.setValue(response.drugName);
          this.medicationForm.get('drugId')?.setValue(response.drugID);
        });
    }
  }

  addProcedure() {
    console.log('procedure form data', this.procedureForm.value);
    console.log('selected procedure: ', this.selectedProcedure);
    this.procedureArray.push(this.selectedProcedure);
    //this.patientService.addAllergy(this.allergyForm.value).subscribe();
    this.procedureForm.reset();

    this.dataSourceProcedure.data = this.procedureArray;
    console.log('dataSourceProcedure', this.dataSourceProcedure.data);
  }

  addMedication() {
    this.medicationArray.push(this.selectedMedication);
    this.medicationForm.reset();
    this.dataSourceMedication.data = this.medicationArray;
  }

  setMedicationDetails(medication: Medication, event: any) {
    if (event.isUserInput) {
      console.log('selected medicine:', medication);
      this.selectedMedication = medication;
    }
  }

  addPrescription() {
    this.prescriptionForm.get('medication').setValue(this.selectedMedication);
    this.prescriptionForm.get('appointmentId').setValue(this.appointementId);
    // this.prescriptionForm.get('patientVisitId')?.setValue(this.patientVisitDetails?.patientVisitId)
    this.patientVisitForm
      .get('patientVisit')
      ?.get('patientVisitId')
      .setValue(this.patientVisitDetails?.patientVisitId);
    console.log('prescription form data', this.prescriptionForm.value);

    this.prescriptionService
      .submitPrescription(this.prescriptionForm.value)
      .subscribe();
    this.prescriptionArray.push(this.prescriptionForm.value);

    this.prescriptionService
      .getAllPrescriptionByAppointment(this.appointmentDetails.appointmentId)
      .subscribe((response) => {
        this.dataSourcePrescription.data = response;
        console.log(
          'Prescription datasource',
          this.dataSourcePrescription.data
        );
      });
  }

  addPatientVisit() {
    this.patientVisitForm
      .get('appointment')
      ?.get('appointmentId')
      .setValue(this.appointmentDetails.appointmentId);
    this.patientVisitForm
      .get('patientId')
      .setValue(this.appointmentDetails.patientId);
    this.patientVisitForm
      .get('patientName')
      .setValue(this.appointmentDetails.patientName);
    this.patientVisitForm.get('visitStatus').setValue('Added');
    console.log('visit form', this.patientVisitForm.value);
    this.patientVisitService
      .submitPatientVisitDetails(this.patientVisitForm.value)
      .subscribe();
    window.alert('Visit details added successfully!');
    this.patientVisitForm.reset();
    this.isAddButtonDisabled = true;
  }

  onTabClick(event: any) {
    console.log(event);
    console.log(event.tab.textLabel);

    if (event.index === 1) {
      console.log('vital sign tab clicked');

      // console.log("sender id: ", this.senderId);

      // this.inboxService.getAllSentNote(this.senderId).subscribe(sentNotes =>{
      //   this.sentNotes = sentNotes;
      //   this.dataSourceSent.data = this.sentNotes
      //   console.log("Data source : " , this.dataSourceSent.data);
      //  // console.log("message:" );

      // })

      if (this.userDetailsFromLogin.userRoleId.roleType === 'Physician') {
        this.patientVisitService
          .getPatientVisitDetailsByPatientAndAppointmentId(
            this.appointmentDetails.patientId,
            this.appointmentDetails.appointmentId
          )
          .subscribe((response) => {
            this.patientVisitDetailsFromDb = response;
            console.log('visit dtails @@@@', this.patientVisitDetailsFromDb);
          });
        this.patientVisitForm.patchValue({
          height: this.patientVisitDetailsFromDb.height,
          weight: this.patientVisitDetailsFromDb.weight,
          respirationRate: this.patientVisitDetailsFromDb.respirationRate,
          bodyTemperature: this.patientVisitDetailsFromDb?.bodyTemperature,
          bloodPressure: this.patientVisitDetailsFromDb?.bloodPressure,
        });

        if (this.patientVisitDetailsFromDb.height != null) {
          this.isAddButtonDisabled = true;
        }

        // if(this.patientVisitDetails != null){
        //   console.log("null");

        // }else{
        //   console.log("not null");
        //   console.log("Visit details: ", this.patientVisitDetailsFromDb);

        // this.patientVisitForm.patchValue({
        //   height: this.patientVisitDetailsFromDb?.height,
        //   weight: this.patientVisitDetailsFromDb?.weight,
        //   respirationRate: this.patientVisitDetailsFromDb?.respirationRate,
        //   bodyTemperature:this.patientVisitDetailsFromDb?.bodyTemperature,
        //   bloodPressure:this.patientVisitDetailsFromDb?.bloodPressure,

        // });
        // }
      }
    }

    if (event.index === 2) {
      console.log(' visit details tab clicked');

      //   this.receiverId = 1;
      // console.log("receiver id: ", this.receiverId);

      // // this.inboxService.getAllReceivedNote(this.senderId).subscribe(receivedNotes =>{
      //   this.inboxService.getAllReceivedNote(2).subscribe(receivedNotes =>{
      //   this.receivedNote = receivedNotes;
      //   this.dataSourceReceived.data = this.receivedNote
      //   console.log("Data source : " , this.dataSourceReceived.data);
      // })

      this.patientVisitService
        .getPatientVisitDetailsByPatientAndAppointmentId(
          this.appointmentDetails.patientId,
          this.appointmentDetails.appointmentId
        )
        .subscribe((response) => {
          this.patientVisitDetails = response;
          console.log('Visit details: ', this.patientVisitDetails);
        });
    }
  }

  updateVisitDetails() {
    this.patientVisitDetails.diagnosis = this.diagnosisArray;
    this.patientVisitDetails.procedure = this.procedureArray;
    this.patientVisitDetails.medication = this.medicationArray;
    this.patientVisitDetails.visitStatus = 'Complete';
    console.log('Patient visit final : ', this.patientVisitDetails);
    this.patientVisitService
      .updatePatientVisit(
        this.patientVisitDetails.patientVisitId,
        this.patientVisitDetails
      )
      .subscribe();
  }

  deleteDiagnosis(row: any) {
    const index = this.dataSourceDiagnosis.data.indexOf(row.diagnosisId);
    this.dataSourceDiagnosis.data.splice(index - 1, 1);
    this.dataSourceDiagnosis._updateChangeSubscription(); // <-- Refresh the datasource
  }

  deleteProcedure(row: any) {
    const index = this.dataSourceProcedure.data.indexOf(row.procedureId);
    this.dataSourceProcedure.data.splice(index - 1, 1);
    this.dataSourceProcedure._updateChangeSubscription(); // <-- Refresh the datasource
  }

  deleteMedication(row: any) {
    const index = this.dataSourceMedication.data.indexOf(row.drugNo);
    this.dataSourceMedication.data.splice(index - 1, 1);
    this.dataSourceMedication._updateChangeSubscription(); // <-- Refresh the datasource
  }
}
