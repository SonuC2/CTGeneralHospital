import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  hideAllergy=true;
  isNurse :boolean = true;
  isPatient : boolean = false;
 
  constructor(private router: Router) { }

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

  navigateToVital(){
    this.router.navigate(['/nurse/patient-visit']);
  }
}
