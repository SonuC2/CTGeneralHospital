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
    return this._httpClient.post<Patient>("http://localhost:8080/patientDetails/submitDetails",data);
  }

  getAllPatientList():Observable<Patient[]>
  {
    return this._httpClient.get<Patient[]>("http://localhost:8080/patientDetails/getalldata");
  }

  getPatientById(id: number):Observable<Patient>
  {
  //   const params = new HttpParams()
  // .set('id', id)
  let url = "http://localhost:8080/patientDetails/getDataById/" + id;
    // return this.httpClient.get<Employee>("http://localhost:8080/employee/getById/",{params});
    return this._httpClient.get<Patient>(url);
  }

  updatePatientDetails(data:Patient):Observable<Patient>
  {
    return this._httpClient.put<Patient>("http://localhost:8080/patientDetails/update",data);
  }

}
