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
    return this.httpClient.get<Employee[]>("http://localhost:9003/employee");
  }

  getEmployeeById(id: number):Observable<Employee>
  {
    let url = "http://localhost:9003/employee/" + id;
    return this.httpClient.get<Employee>(url);
  }

  deleteEmployeeById(employeeId:number): Observable<Employee> {
    let url = 'http://localhost:9003/employee/' + employeeId;
    return this.httpClient.delete<Employee>(url);
  }

  addEmployee(emp:Employee): Observable<Employee>{
    return this.httpClient.post<Employee>("http://localhost:9003/user/",emp);
  }

  updateEmployee(emp:Employee): Observable<Employee>{
    console.log("employee from service ts :"+emp);
    return this.httpClient.patch<Employee>("http://localhost:9003/employee/",emp);
  }

  activeToInactiveStatus(employee:Employee): Observable<Employee> {
   return this.httpClient.patch<Employee>("http://localhost:9003/inactive/",employee);
  }

  inactiveToActiveStatus(employee:Employee): Observable<Employee> {
   return this.httpClient.patch<Employee>("http://localhost:9003/active/",employee);
  }

  unblockToBlockStatus(employee:Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>("http://localhost:9003/block/",employee);
  }

  blockToUnblockStatus(employee:Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>("http://localhost:9003/unblock/",employee);
  }
}
