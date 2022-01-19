import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})

export class DesignComponent implements OnInit {
 // isFormShown:boolean=false;
  constructor( private router: Router) { }
  form!: any;
  ngOnInit(): void {
  }
onChangepassword(){
  this.router.navigate(['/loginregistration-homepage']);
// this.isFormShown=true;
 
}
submitPassword(){}
}
