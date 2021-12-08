import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  hideAllergy=true;
  isRegister=false;
  isUpdate=true;
  isEdit=true;
  constructor(public dialog:MatDialog,private _snackbar:MatSnackBar) { }

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
  register(){
    this._snackbar.open("Patient Details Successfully Registered","done");
    this.isRegister=true;
    this.isEdit=false;
    console.log("registered")
  }
  update(){
    console.log("update")
  }
  EditData(){
    console.log("edit data")
    this.isEdit=true;
    this.isUpdate=false;
  }
}
