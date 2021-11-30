import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { RouterModule, Routes } from '@angular/router';
 import {MatCardModule} from '@angular/material/card';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MyDetailsComponent } from './my-details/my-details.component';

const routes:Routes=[
  {
    path:'patient-details',component:PatientDetailsComponent
  },
  {
    path:'my-details',component:MyDetailsComponent
  }
]

@NgModule({
  declarations: [
    PatientDetailsComponent,
    MyDetailsComponent
  ],
  imports: [
    CommonModule,
     MatCardModule,
     MatDatepickerModule,
     MatNativeDateModule,
    // MatGridListModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatRadioModule,
     MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }
