import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from '../entities/appointments';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private _httpClient:HttpClient) { }


  addAppointment(ap:Appointments){
    return this._httpClient.post("http://localhost:9005/appointment",ap);
  }

  getAllAppointmentList(): Observable<Appointments[]> {
    return this._httpClient.get<Appointments[]>('http://localhost:9005/appointment/getBookedAndRescheduleAppointment');

  }

  updateAppointment(appointment:Appointments):Observable<Appointments>{
      return this._httpClient.patch<Appointments>('http://localhost:9005/appointment',appointment);
      
  }

  // cancelAppointmentById(appointmentId:number){
  //   return this._httpClient.delete('http://localhost:8080/appointment/deleteAppointmentById/'+ appointmentId);
  // }

  cancelAppointment(appointment: Appointments): Observable<Appointments[]>{
    return this._httpClient.patch<Appointments[]>('http://localhost:9005/appointment/',appointment);
  }

  getAppointmentForEmployee(employeeId:number): Observable<Appointments[]> {
    return this._httpClient.get<Appointments[]>('http://localhost:9005/appointment/employee/' + employeeId);

  }

  getAppointmentForPatient(patientId:number): Observable<Appointments[]> {
    return this._httpClient.get<Appointments[]>('http://localhost:9005/appointment/patient/' + patientId);

  }

  getAppointmentById(appointementId: any): Observable<Appointments> {
    return this._httpClient.get<Appointments>('http://localhost:9005/appointment/' + appointementId);

  }

  getAppointmentByAppointmentId(id:any): Observable<Appointments> {
    return this._httpClient.get<Appointments>('http://localhost:9005/appointment/' + id);

  }

  getRequestedAppointmentForEmployee(employeeId:number): Observable<Appointments[]> {
    return this._httpClient.get<Appointments[]>('http://localhost:9005/appointment/employee/requested/' + employeeId);

  }
}
