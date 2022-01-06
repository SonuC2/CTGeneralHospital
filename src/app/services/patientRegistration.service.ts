import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRegistration } from '../entities/patientRegistration';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {

  constructor(private _httpClient:HttpClient) { }

  submitPatientRegDetails(data:PatientRegistration):Observable<PatientRegistration>
  {
    return this._httpClient.post<PatientRegistration>("http://localhost:7070/savePatientReg",data);
  }

}