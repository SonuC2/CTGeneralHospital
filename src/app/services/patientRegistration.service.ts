import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRegistration } from '../entities/patient-registration';
// import { PatientRegistration } from '../entities/patientRegistration';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {

  constructor(private _httpClient:HttpClient) { }

  submitPatientRegDetails(data:PatientRegistration):Observable<PatientRegistration>
  {
    return this._httpClient.post<PatientRegistration>("http://localhost:9004/register-patient",data);
  }

  registerPatient(data:PatientRegistration):Observable<PatientRegistration>{
    return this._httpClient.post<PatientRegistration>("http://localhost:9004/register-patient",data);
  }

  getAllPatientList():Observable<PatientRegistration[]>{
    return this._httpClient.get<PatientRegistration[]>('http://localhost:9004/register-patient/approval-list' );
  }

  getPatientDetailsByUserId(userId:number):Observable<PatientRegistration>{
    return this._httpClient.get<PatientRegistration>('http://localhost:9004/register-patient/patient-detaild/'+ userId );
  }

  // All Active Patient list status= Active
  getAllActivePatientList():Observable<PatientRegistration[]>{
    return this._httpClient.get<PatientRegistration[]>('http://localhost:9004/patient/active-list');
  }

  // Update Patient status InActive to Active 
  approvePatient(patientApproveData:PatientRegistration):Observable<PatientRegistration>{
    console.log(patientApproveData);
    return this._httpClient.patch<PatientRegistration>('http://localhost:9004/register-patient/approve-registration', patientApproveData);
  }

  // All Active Patient list status count = Active
  getAllActivePatientCount():Observable<PatientRegistration[]>{
    return this._httpClient.get<PatientRegistration[]>('http://localhost:9004/register-patient/active');
  }

   // All Inactive Patient list status count = Inactive
   getAllInactivePatientList():Observable<PatientRegistration[]>{
    return this._httpClient.get<PatientRegistration[]>('http://localhost:9004/register-patient/approval-count');
  }

  activeToInactiveStatus(patient:PatientRegistration): Observable<PatientRegistration> {
    return this._httpClient.patch<PatientRegistration>("http://localhost:9004/inactivePatient/",patient);
  }
 
  inactiveToActiveStatus(patient:PatientRegistration): Observable<PatientRegistration> {
    return this._httpClient.patch<PatientRegistration>("http://localhost:9004/activePatient/",patient);
  }
 
  unblockToBlockStatus(patient:PatientRegistration): Observable<PatientRegistration> {
    return this._httpClient.patch<PatientRegistration>("http://localhost:9004/block-patient/",patient);
  }

  blockToUnblockStatus(patient:PatientRegistration): Observable<PatientRegistration> {
    return this._httpClient.patch<PatientRegistration>("http://localhost:9004/unblock-patient/",patient);
  }  

  getPatientDetailsByPatientId(patientId:number):Observable<PatientRegistration>{
    return this._httpClient.get<PatientRegistration>('http://localhost:9004/register-patient/patient/'+ patientId );
  }
}