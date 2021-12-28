import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RouterModule, Routes } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PatientDetailsComponent } from '../patient/patient-details/patient-details.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { PatientListComponent } from './patient-list/patient-list.component';
const routes: Routes = [
  {
  path: "employee-list",
  component: EmployeeListComponent,
  
  },
  {
    path: "employee-details/:id",
    component: EmployeeDetailsComponent
    },
    {
      path: "patient-visit",
      component: PatientVisitComponent
    },
    {
        path: "patient-list",
        component: PatientListComponent
    },
    // {
    //   path:"patient-details",
    //   component:PatientDetailsComponent
    // },
    {
      path: 'patient',
      loadChildren: () =>
        import('src/app/patient/patient.module').then((m) => m.PatientModule),
    },
  ]


@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    EmployeeListComponent,
    PatientVisitComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterModule.forChild(routes)
  ]
})
export class NurseModule { }
