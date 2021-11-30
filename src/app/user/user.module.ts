import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    EmployeeRegistrationComponent,
    PatientRegistrationComponent
  ],
  imports: [
    CommonModule,FormsModule,MatGridListModule,MatFormFieldModule,MatInputModule,FlexLayoutModule,MatRadioModule
  ],
  exports: [EmployeeRegistrationComponent],
})
export class UserModule { }
