import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  title = 'CTGeneralHospital';
  isExpanded : boolean = true;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isPatient:boolean =false;
  isAdmin:boolean = false;
  isPhysician:boolean=true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showPatientSubMenu: boolean = false;
  showEmployeeSubMenu : boolean = false;
  showPhysicianSubMenu : boolean = false;

  isNurse : boolean = false;
  enterDetails:boolean=false;
  viewDetails:boolean=true;
  MyVisitHistory:boolean=true;
  downloadMydata:boolean=true;
  appointment:boolean=true;
 
   constructor(private observer: BreakpointObserver,private router:Router) {}
 
   ngAfterViewInit() {
     this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
       if (res.matches) {
         this.sidenav.mode = 'over';
         this.sidenav.close();
       } else {
         this.sidenav.mode = 'side';
         this.sidenav.open();
       }
     });
   }

   hideLink(){
     this.enterDetails=true;
     this.viewDetails=false;
     this.MyVisitHistory=false;
     this.downloadMydata=false;
      this.appointment=false;
     
   }
   mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  
}
