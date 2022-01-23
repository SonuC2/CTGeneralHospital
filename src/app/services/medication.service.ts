import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medication } from '../entities/medication';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private httpClient: HttpClient) { }

  getAllMedication():Observable<Medication[]>
  {
    return this.httpClient.get<Medication[]>("http://localhost:9005/medication");
  }

  getDrugDetailsByDrugName(name:string):Observable<Medication>
  {
    return this.httpClient.get<Medication>("http://localhost:9005/medication/" + name);
  }

  getDrugDetailsByDrugId(drugId:any):Observable<Medication>{
    return this.httpClient.get<Medication>("http://localhost:9005/medication/drug/" + drugId);
  }
}
