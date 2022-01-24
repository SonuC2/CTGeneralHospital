import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from '../entities/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private httpClient: HttpClient) { }

  submitPrescription(data: Prescription): Observable<Prescription> {
    return this.httpClient.post<Prescription>(
      'http://localhost:9005/prescription',
      data
    );
  }

  getAllPrescriptionByAppointment(appointementId:any):Observable<Prescription[]>
  {
    return this.httpClient.get<Prescription[]>("'http://localhost:9005/prescription/" + appointementId);
  }
}
