import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../entities/employee-dto';
import { Inbox } from '../entities/inbox';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private httpClient:HttpClient) { }

  sendNote(data:Inbox):Observable<Inbox>
  {
    return this.httpClient.post<Inbox>("http://localhost:9003/notes",data);
  }

  getAllEmployeeList():Observable<EmployeeDTO[]>
  {
    return this.httpClient.get<EmployeeDTO[]>("http://localhost:9003/notes/employee-details");
  }

  getAllSentNote(senderId : number) : Observable<Inbox[]>{
    let url = "http://localhost:9003//notes/sender/" + senderId;
    return this.httpClient.get<Inbox[]>(url);

  }

  getAllReceivedNote(receiverId : number) : Observable<Inbox[]>{
    let url = "http://localhost:9003//notes/receiver/" + receiverId;
    return this.httpClient.get<Inbox[]>(url);

  }



}
