import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedure } from '../entities/procedure';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private httpClient: HttpClient) { }

  getAllProcedure():Observable<Procedure[]>
  {
    return this.httpClient.get<Procedure[]>("http://localhost:9005/procedure");
  }

  getProcedureDescriptionByCode(dcode:string):Observable<Procedure>
  {
    return this.httpClient.get<Procedure>("http://localhost:9005/procedure/" + dcode);
  }
}
