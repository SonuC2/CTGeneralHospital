import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointments } from '../entities/appointments';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private httpClient:HttpClient) { }


  addAppointment(ap:Appointments){
    return this.httpClient.post("http://localhost:8080/appointment/addAppointment",ap);
  }
}
