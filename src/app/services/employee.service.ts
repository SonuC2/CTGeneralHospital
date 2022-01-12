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
    return this.httpClient.get<Employee[]>("http://localhost:8080/employee");
  }

  getEmployeeById(id: number):Observable<Employee>
  {
  //   const params = new HttpParams()
  // .set('id', id)
  let url = "http://localhost:9004/employee/" + id;
    // return this.httpClient.get<Employee>("http://localhost:8080/employee/getById/",{params});
    return this.httpClient.get<Employee>(url);
  }

  deleteEmployeeById(employeeId:number): Observable<Employee> {
    let url = 'http://localhost:8080/employee/' + employeeId;
    return this.httpClient.delete<Employee>(url);
  }

  addEmployee(emp:Employee): Observable<Employee>{
    return this.httpClient.post<Employee>("http://localhost:8080/employee/",emp);
  }

  updateEmployee(emp:Employee): Observable<Employee>{
    console.log("employee from service ts :"+emp);
    return this.httpClient.patch<Employee>("http://localhost:8080/employee/",emp);
  }
}
