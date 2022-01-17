import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetails!:User;
  constructor(private httpClient: HttpClient) { }

  login(data:User):Observable<User>{
    return this.httpClient.post<User>("http://localhost:9004/user/login",data);
  }
}
