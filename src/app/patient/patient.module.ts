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
import { AlreadyEnteredDetailsComponent } from './already-entered-details/already-entered-details.component';
import { GetMyDataComponent } from './get-my-data/get-my-data.component';

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
    path: 'my-details',
    component: MyDetailsComponent,
  },
  {
    path: 'already-entered-details',
    component: AlreadyEnteredDetailsComponent,
  },
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
    AlreadyEnteredDetailsComponent,
    GetMyDataComponent,
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
    RouterModule.forChild(routes),
  ],
})
export class PatientModule {}
