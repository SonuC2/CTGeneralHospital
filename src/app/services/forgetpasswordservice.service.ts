import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { catchError, config, Observable, throwError } from 'rxjs';
import { User } from '../entities/user';


@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService{
  
  userDetails!:User;
  constructor(private httpClient: HttpClient) { }
 
  forgetPassword(data:User):Observable<User>{
   email:data.email
    return this.httpClient.post<User>("http://localhost:9004/password/forgot-password",data).pipe(catchError(this.errorHandler))
   
  } 
  errorHandler(error:HttpErrorResponse){

  return throwError('username might not be correct');
  }
 
  }

