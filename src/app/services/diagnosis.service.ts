import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diagnosis } from '../entities/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  constructor(private httpClient: HttpClient) { }

  getAllDiagnosis():Observable<Diagnosis[]>
  {
    return this.httpClient.get<Diagnosis[]>("http://localhost:9005/diagnosis");
  }

  getDiagnosisDescriptionByCode(dcode:string):Observable<Diagnosis>
  {
    return this.httpClient.get<Diagnosis>("http://localhost:9005/diagnosis/" + dcode);
  }
}
