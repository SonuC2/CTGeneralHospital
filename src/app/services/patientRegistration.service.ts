import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRegistration } from '../entities/patient-registration';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {

  constructor(private _httpClient:HttpClient) { }

  submitPatientRegDetails(data:PatientRegistration):Observable<PatientRegistration>
  {
    return this._httpClient.post<PatientRegistration>("http://localhost:7070/savePatientReg",data);
  }

  getAllApprovePatientList():Observable<PatientRegistration[]>{
    return this._httpClient.get<PatientRegistration[]>('http://localhost:8080/register-patient/approval-list');
  }

  approvePatient(patientApproveData:PatientRegistration):Observable<PatientRegistration>{
    return this._httpClient.patch<PatientRegistration>('http://localhost:8080/register-patient/approve-registration', patientApproveData);
  }
}