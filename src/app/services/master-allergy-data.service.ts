import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllergyMasterData } from '../entities/allergy-master-data';

@Injectable({
  providedIn: 'root'
})
export class MasterAllergyDataService {

  constructor(private httpClient:HttpClient) { }

  getMasterAllergyData():Observable<AllergyMasterData[]>
  {
    return this.httpClient.get<AllergyMasterData[]>('http://localhost:9093/masterAllergy/allergyData');
  }

  getAllAllergyId():Observable<number[]>
  {
    return this.httpClient.get<number[]>('http://localhost:9093/masterAllergy/allergyDataId');
  }
  getAllAllergyType():Observable<string[]>
  {
    return this.httpClient.get<string[]>('http://localhost:9093/masterAllergy/allergyDataType');
  }
  getAllergyType(id:number):Observable<string[]>
  {
    return this.httpClient.get<string[]>('http://localhost:9093/masterAllergy/allergyType'+"/"+id);
  }
  getAllergyNameByType(type:any):Observable<string[]>
  {
    return this.httpClient.get<string[]>('http://localhost:9093/masterAllergy/allergyNamesByType'+"/"+type);

  }
  getAllergyName(id:number):Observable<string[]>
  {
    return this.httpClient.get<string[]>('http://localhost:9093/masterAllergy/allergyName'+"/"+id);
  }
  getAllAllergyName():Observable<string[]>
  {
    return this.httpClient.get<string[]>('http://localhost:9093/masterAllergy/allergyAllName');
  }
}
