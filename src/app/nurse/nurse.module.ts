import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
  path: "employee-details",
  component: EmployeeDetailsComponent
  }
  ]


@NgModule({
  declarations: [
    EmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NurseModule { }
