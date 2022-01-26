import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { User } from '../entities/user';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Password } from '../entities/password';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient:HttpClient,private router:Router) { }


  changePassword(user:User):Observable<String>
  {
    return this.httpClient.post<String>("http://localhost:9004/password/change-password",user)
    .pipe( catchError(this.errorHandler));
  }

  getAllPassword():Observable<Password[]>
  {
    return this.httpClient.get<Password[]>("http://localhost:9004/password")
    
  }
  errorHandler(error:any)
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log("hello from serviceup"+errorMessage)

    } else {
      // Get server-side error
      errorMessage = `${error.status}`;
      console.log("hello from servicedown"+errorMessage)
    }
    if(errorMessage==="201")
    {
    window.alert("Password Successfully changed");
    
    }
    else{
      window.alert("new password must be different from last 10 password")
    }
    return throwError(errorMessage);

  }
}
