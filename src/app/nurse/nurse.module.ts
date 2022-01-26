import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PatientDetailsComponent } from '../patient/patient-details/patient-details.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';
import { InboxComponent } from './inbox/inbox.component';
import { ReplyNoteDialogComponent } from './reply-note-dialog/reply-note-dialog.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { VisitHistoryComponent } from './visit-history/visit-history.component';
const routes: Routes = [
  {
    path: "",
    component: NurseDashboardComponent,
    
    },
  {
  path: "employee-list",
  component: EmployeeListComponent,
  
  },
  {
    path: "employee-details/:id",
    component: EmployeeDetailsComponent,
    // data:{id: 1}
    },
    {
      path: "patient-visit",
      component: PatientVisitComponent
    },
    {
        path: "patient-list",
        component: PatientListComponent
    },
    {
      path: "edit-patient-details/:id",
      component: PatientVisitComponent,
      // data:{id: 1}
      },
      {
        path: "register-patient",
        component: RegisterPatientComponent,
        // data:{id: 1}
        },
    // {
    //   path:"patient-details",
    //   component:PatientDetailsComponent
    // },
    {
      path: "notes",
      component: InboxComponent,
      // data:{id: 1}
      },
      {
        path: "add-visit/:appointmentId",
        component: PatientVisitComponent
      },
      {
        path: "visit-history/:patientId",
        component: VisitHistoryComponent
      },
    {
      path: 'patient',
      loadChildren: () =>
        import('src/app/patient/patient.module').then((m) => m.PatientModule),
    },
    {
      path: 'shared',
      loadChildren: () =>
        import('src/app/shared/shared.module').then((m) => m.SharedModule),
    },
  ]


@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    EmployeeListComponent,
    PatientVisitComponent,
    PatientListComponent,
    EditPatientComponent,
    NurseDashboardComponent,
    InboxComponent,
    ReplyNoteDialogComponent,
    RegisterPatientComponent,
    VisitHistoryComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
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
    MatDialogModule,
    MatProgressBarModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ]
})
export class NurseModule {}
