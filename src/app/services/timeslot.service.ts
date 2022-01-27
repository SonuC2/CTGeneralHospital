import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timeslot } from '../entities/timeslot';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  constructor( private _httpClient: HttpClient) { }

  addTimeSlot(newTimeSlot: Timeslot){
    return this._httpClient.post("http://localhost:9005/time-slot",newTimeSlot);
  }
  

  getAllTimeSlot(employeeId:number): Observable<Timeslot[]> {

    return this._httpClient.get<Timeslot[]>('http://localhost:9005/time-slot/all/'+ employeeId);

  }

  // getTimeSlotByDoctorIdAndDate(id:number, date:Date):Observable<Timeslot[]>{
  //   return this._httpClient.get<Timeslot[]>('http://localhost:8080/time/'+id , date);
  // }

  getTimeSlotByDoctorIdAndDate(id:number,appointmentDate:String):Observable<Timeslot[]>{
    return this._httpClient.get<Timeslot[]>("http://localhost:9005/time-slot/"+id+ "/"+ appointmentDate);
  }

  getTimeSlotByDoctorId(employeeId:number):Observable<Timeslot[]>{
    return this._httpClient.get<Timeslot[]>("http://localhost:9005/time-slot/" + employeeId);
  }

  deleteTimeSlotBySlotId(slotId:number){
    return this._httpClient.delete('http://localhost:9005/time-slot/delete/'+slotId);
  }
}
