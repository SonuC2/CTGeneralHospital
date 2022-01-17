import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../entities/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient ){ }

  getAllEmployeeList():Observable<Employee[]>
  {
    return this.httpClient.get<Employee[]>("http://localhost:9004/employee");
  }

  getEmployeeById(id: number):Observable<Employee>
  {
  //   const params = new HttpParams()
  // .set('id', id)
  let url = "http://localhost:9004/employee/" + id;
    // return this.httpClient.get<Employee>("http://localhost:8080/employee/getById/",{params});
    return this.httpClient.get<Employee>(url);
  }

  getEmployeeDetailsByUserId(userId:number):Observable<Employee>{
    return this.httpClient.get<Employee>('http://localhost:9004/employee/employee-details/'+ userId );
  }
}
