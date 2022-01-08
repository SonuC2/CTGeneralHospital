import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergy } from '../entities/allergy';
import { Patient } from '../entities/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  PatientData!:Patient;
  downloadPatinet!:Patient;
  firstName!:string;
  lastName!:string;
  constructor(private _httpClient:HttpClient) { }

  setPatientIdFromTs(firstName:string,lastName:string)
  {
     this.firstName=firstName;
     this.lastName=lastName;
     console.log("data form service of patient "+this.firstName+" "+this.lastName)
  }
  getFirstName()
  {
    return this.firstName;
  }
  getLastName()
  {
    return this.lastName;
  }
  getByFirstNameAndLastName(firstName:string,lastName:string):Observable<Patient>
  {
    return this._httpClient.get<Patient>("http://localhost:9093/patientDetails/patient"+"/"+firstName+"/"+lastName);
  }
  
  submitPatientDetails(data:Patient):Observable<Patient>
  {
    return this._httpClient.post<Patient>("http://localhost:9093/patientDetails/patient",data);
  }

  getAllPatientDetails(id:number):Observable<Patient>
  {
    return this._httpClient.get<Patient>("http://localhost:9093/patientDetails/patient"+"/"+id);
  }

  getPatientDataByEmail(email:string):Observable<Patient>
  {
    return this._httpClient.get<Patient>("http://localhost:9093/patientDetails/patient"+"/"+email)
  }

  getPatientIdByFirstNameLastNameAndEmail(patient:Patient):Observable<number>
  {
    
    return this._httpClient.get<number>("http://localhost:9093/patientDetails/patient"+"/"+patient.firstName+"/"+patient.lastName+"/"+patient.email);
    
  }

  getPatientDataByFirstNameAndEmail(patient:Patient):Observable<Allergy[]>
  {
    return this._httpClient.get<Allergy[]>("http://localhost:9093/patientDetails/allergies"+"/"+patient.firstName+"/"+patient.email)
  }

  updatePatientById(patient:Patient,id:number):Observable<Patient>
  {
    return this._httpClient.put<Patient>("http://localhost:9093/patientDetails/patient"+"/"+id,patient);
  }



}
