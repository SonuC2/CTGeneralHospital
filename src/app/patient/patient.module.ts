import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
// import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDetailsComponent } from './my-details/my-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DataSubmissionDialogComponent } from './data-submission-dialog/data-submission-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GetMyDataComponent } from './get-my-data/get-my-data.component';
import { MyCompliteDetailsComponent } from './my-complite-details/my-complite-details.component';
import { HttpClientModule } from '@angular/common/http';
import { EditPatientDetialsComponent } from './edit-patient-detials/edit-patient-detials.component';
import { SuccessfullySubmittedPatienDatailsComponent } from './successfully-submitted-patien-datails/successfully-submitted-patien-datails.component';
import {MatDividerModule} from '@angular/material/divider';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'patient-details',
    pathMatch: 'full',
  },
  {
    path: 'patient-details',
    component: PatientDetailsComponent,
  },
  {
    path: 'successfully-submitted-patien-datails',
    component: SuccessfullySubmittedPatienDatailsComponent,
  },
  {
    path: 'edit-patient-details',
    component: EditPatientDetialsComponent,
  },
  {
    path: 'my-details',
    component: MyDetailsComponent,children:[{path:"complite-details",component:MyCompliteDetailsComponent}]
  },
  // {
  //   path: 'scheduling',
  //   loadChildren: () =>
  //     import('src/app/scheduling/scheduling.module').then(
  //       (m) => m.SchedulingModule
  //     ),
  // },
  {
    path: 'get-my-data',
    component: GetMyDataComponent,
  },
];

@NgModule({
  declarations: [
    PatientDetailsComponent,
    MyDetailsComponent,
    DataSubmissionDialogComponent,
    GetMyDataComponent,
    MyCompliteDetailsComponent,
    EditPatientDetialsComponent,
    SuccessfullySubmittedPatienDatailsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDividerModule,
    FormsModule,
    // MatGridListModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class PatientModule {}
