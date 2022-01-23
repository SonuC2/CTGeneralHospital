import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientVisit } from '../entities/patient-visit';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitService {

  constructor(private httpClient: HttpClient) { }

  submitPatientVisitDetails(data: PatientVisit): Observable<PatientVisit> {
    return this.httpClient.post<PatientVisit>(
      'http://localhost:9005/patient-visit',
      data
    );
  }

  getPatientVisitDetailsByPatientAndAppointmentId(patientId:number, appointmentId:number):Observable<PatientVisit>
  {
    return this.httpClient.get<PatientVisit>("http://localhost:9005/patient-visit/" + patientId +"/" + appointmentId);
  }

  updatePatientVisit(visitId : any,data: PatientVisit): Observable<PatientVisit> {
    return this.httpClient.patch<PatientVisit>(
      'http://localhost:9005/patient-visit/visit/'+ visitId,
      data
    );
  }

  getPatientVisitHistoryForPatient(patientId:number):Observable<PatientVisit[]>
  {
    return this.httpClient.get<PatientVisit[]>("http://localhost:9005/patient-visit/history/patient/" + patientId);
  }
}
