import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from '../entities/appointments';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private httpClient: HttpClient) {}

  getRequestedAppointmentList(): Observable<Appointments[]> {
    return this.httpClient.get<Appointments[]>(
      'http://localhost:8080/getAllRequestedAppointments'
    );
  }

  cancelAppointment(appointment: Appointments): Observable<Appointments[]>{
    return this.httpClient.patch<Appointments[]>('http://localhost:8080/cancelAppointment/',appointment);
  }

  approveAppointment(appointment: Appointments):Observable<Appointments[]> {
    return this.httpClient.patch<Appointments[]>('http://localhost:8080/approveToBookedAppointment/',appointment);
  }
}
