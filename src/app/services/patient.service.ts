import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergy } from '../entities/allergy';
import { Patient } from '../entities/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  PatientData!: Patient;
  downloadPatinet!: Patient;
  firstName!: string;
  lastName!: string;
  pid!:number;
  pFirstName!:string;
  pLastName!:string;
  pemail!:string;
  patientDataFromPatientDetails!:Patient;
  trueFromMyDetails!:boolean;
  falseFromMyDetails!:boolean;
  constructor(private _httpClient: HttpClient) {}

  
  getHerePatientDataFromPatientDetails(patientData:Patient)
  {
    console.log(patientData.email+" from patient service");
    this.pFirstName=patientData.firstName;
    this.pLastName=patientData.lastName;
    this.pemail=patientData.email;
    
     return this.patientDataFromPatientDetails=patientData;
  }
  sendDataToPatientDetailsTs()
  {
    return this.patientDataFromPatientDetails;
  }
  setPatientIdFromTs(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    console.log(
      'data form service of patient ' + this.firstName + ' ' + this.lastName
    );
  }
  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getByFirstNameAndLastName(
    firstName: string,
    lastName: string
  ): Observable<Patient> {
    return this._httpClient.get<Patient>(
      'http://localhost:9093/patientDetails/patient' +
        '/' +
        firstName +
        '/' +
        lastName
    );
  }

  submitPatientDetails(data: Patient): Observable<Patient> {
    return this._httpClient.post<Patient>(
      'http://localhost:9093/patientDetails/patient',
      data
    );
  }

  getAllPatientDetails(id: any): Observable<Patient> {
    return this._httpClient.get<Patient>(
      'http://localhost:9093/patientDetails/patient' + '/' + id
    );
  }

  getPatientDataByEmail(email: string): Observable<Patient> {
    return this._httpClient.get<Patient>(
      'http://localhost:9093/patientDetails/patient' + '/' + email
    );
  }


  getPatientDataByFirstNameAndEmail(patient:Patient):Observable<Allergy[]>
  {
    return this._httpClient.get<Allergy[]>("http://localhost:9093/patientDetails/allergies"+"/"+patient.firstName+"/"+patient.email)
  }

  updatePatientById(patient:Patient,id:number):Observable<Patient>
  {
    return this._httpClient.put<Patient>("http://localhost:9093/patientDetails/patient"+"/"+id,patient);
  }
  getPatientIdByFirstNameLastNameAndEmail(
    patient: Patient
  ): Observable<number> {
    return this._httpClient.get<number>(
      'http://localhost:9093/patientDetails/patient' +
        '/' +
        patient.firstName +
        '/' +
        patient.lastName +
        '/' +
        patient.email
    );

  }

 

  getAllPatientList():Observable<Patient[]>{
    return this._httpClient.get<Patient[]>('http://localhost:9093/patientDetails/patients' );
  }
  getPatientDetails(): Observable<Patient> {
    return this._httpClient.get<Patient>(
      'http://localhost:9093/patientDetails/patient'
    );
  }

  checkPatientDetailsById(id:any):Observable<boolean>
  {
    return this._httpClient.get<boolean>(
      'http://localhost:9093/patientDetails/checkPatientDetailsById'+"/"+id
    ); 
  }
  getPatientDetailsById(id:any):Observable<Patient>
  {
    return this._httpClient.get<Patient>(
      'http://localhost:9093/patientDetails/PatientById'+"/"+id
    ); 
  }
  addAllergy( id:number,allergy:Allergy[]):Observable<Allergy[]>
  {
    return this._httpClient.put<Allergy[]>('http://localhost:9093/patientDetails/storeAllergy'+"/"+id,allergy);
  }
}
