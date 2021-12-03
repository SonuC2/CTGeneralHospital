import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DesignComponent } from './design/design.component';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    EmployeeRegistrationComponent,
    PatientRegistrationComponent,
    DesignComponent
  ],
  imports: [
    CommonModule,FormsModule,MatGridListModule,MatFormFieldModule,MatInputModule,FlexLayoutModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatButtonModule,ReactiveFormsModule,MatCardModule
  ],
  exports: [EmployeeRegistrationComponent,PatientRegistrationComponent,DesignComponent],
})
export class UserModule { }
