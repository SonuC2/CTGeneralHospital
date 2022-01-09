import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/entities/patient';
import { PatientService } from 'src/app/services/patient.service';
import * as XLXS from 'xlsx';


@Component({
  selector: 'app-get-my-data',
  templateUrl: './get-my-data.component.html',
  styleUrls: ['./get-my-data.component.css']
})
export class GetMyDataComponent implements OnInit {
  fileName = 'export-data.xlsx';
  hid:boolean=true;
  patientData!:Patient;
  firstName!:string;
  lastName!:string;
  abc!:string;
  
  list:string[]=["Bhushan","sonu","Priyanka","Mansi","Parag"];
  constructor(private patientService:PatientService,private location:Location
    ,private  router:Router) { }

  ngOnInit(): void {
  
   
    this.getDataFromMydetails();
  }
  getExcelData() {
    // this.firstName=this.patientService.getFirstName();
    // this.lastName=this.patientService.getLastName();
    // console.log(this.firstName+ " "+"we are from get my data");
    // this.patientService.getByFirstNameAndLastName(this.fileName,this.lastName).subscribe(data=>{
    //   this.patientData=data;
      
    // });
    let element = document.getElementById('excel-id');
    const ws: XLXS.WorkSheet = XLXS.utils.table_to_sheet(element);

    const wb: XLXS.WorkBook = XLXS.utils.book_new();
    XLXS.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLXS.writeFile(wb, this.fileName);
    // this.router.navigate(['/patient/my-details'])
   }
   getDataFromMydetails()
   {
     let data:any=this.location.getState();
     this.patientData=data;

   }
}
