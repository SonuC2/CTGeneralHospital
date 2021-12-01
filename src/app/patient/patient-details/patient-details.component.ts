import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  hideAllergy=true;
 
  constructor() { }

  ngOnInit(): void {
  }
  allergyFalse(event:any)
  {
    console.log("event");
   if(event.target.click)
   {
     this.hideAllergy=false;
   }
   if(!event.target.click)
   {
     this.hideAllergy=true;
   }
    
  }
  allergyTrue(event:any)
  {
    if(event.target.click)
    {
      this.hideAllergy=true;
    }
  }
}
