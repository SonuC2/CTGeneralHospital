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
    let url = "http://localhost:9004/employee/" + id;
    return this.httpClient.get<Employee>(url);
  }

  getEmployeeDetailsByUserId(userId:number):Observable<Employee>{
    return this.httpClient.get<Employee>('http://localhost:9004/employee/employee-details/'+ userId );
  }
  deleteEmployeeById(employeeId:number): Observable<Employee> {
    let url = 'http://localhost:9004/employee/' + employeeId;
    return this.httpClient.delete<Employee>(url);
  }

  addEmployee(emp:Employee): Observable<Employee>{
    return this.httpClient.post<Employee>("http://localhost:9004/user",emp);
  }

  updateEmployee(emp:Employee): Observable<Employee>{
    return this.httpClient.patch<Employee>("http://localhost:9004/employee",emp);
  }

  activeToInactiveStatus(employee:Employee): Observable<Employee> {
   return this.httpClient.patch<Employee>("http://localhost:9004/inactive",employee);
  }

  inactiveToActiveStatus(employee:Employee): Observable<Employee> {
   return this.httpClient.patch<Employee>("http://localhost:9004/active",employee);
  }

  unblockToBlockStatus(employee:Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>("http://localhost:9004/block",employee);
  }

  blockToUnblockStatus(employee:Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>("http://localhost:9004/unblock",employee);
  }

  getAllEmpoyeeCount(): Observable<number> {
    return this.httpClient.get<number>("http://localhost:9004/employee/count");
  }

  getAllEmpoyeeActiveCount(): Observable<Employee> {
    return this.httpClient.get<Employee>("http://localhost:9004/employee/active");
  }

  getEmployeeBySpecialisation(specialisation:string):Observable<Employee[]>{
    return this.httpClient.get<Employee[]>('http://localhost:9004/employee/specialisation/'+ specialisation );
  }
}
