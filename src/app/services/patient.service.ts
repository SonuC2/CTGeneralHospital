import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../entities/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _httpClient:HttpClient) { }

  submitPatientDetails(data:Patient):Observable<Patient>
  {
    return this._httpClient.post<Patient>("http://localhost:9093/patientDetails/submitDetails",data);
  }

}
