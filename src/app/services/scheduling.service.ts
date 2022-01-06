import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from '../entities/appointments';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private httpClient:HttpClient) { }


  addAppointment(ap:Appointments){
    return this.httpClient.post("http://localhost:8080/appointment/addAppointment",ap);
  }

  getAllAppointmentList(): Observable<Appointments[]> {

    return this.httpClient.get<Appointments[]>('http://localhost:8080/appointment/getAllAppointments');

  }

  updateAppointment(appointment:Appointments,appointmentId:number):Observable<Appointments>{
      return this.httpClient.put<Appointments>('http://localhost:8080/appointment/updateAppointmentById/'+ appointmentId,appointment);
  }

  deleteAppointmentById(appointmentId:number){
    return this.httpClient.delete('http://localhost:8080/appointment/deleteAppointmentById/'+ appointmentId)
  }
  
}
