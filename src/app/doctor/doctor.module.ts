import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { TimeslotListComponent } from './timeslot-list/timeslot-list.component';
import { MatCardModule } from '@angular/material/card';
// import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';
import { RequestedAppointmentComponent } from './requested-appointment/requested-appointment.component';
import { EditTimeslotComponent } from './edit-timeslot/edit-timeslot.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsDashboardComponent,
  },
  {
    path: '',
    redirectTo: 'doctors-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'doctors-dashboard',
    component: DoctorsDashboardComponent,
  },
  {
    path: 'edit-timeslot/:index',
    component: EditTimeslotComponent,
  },
  {
    path: 'requested-appointment-list',
    component:RequestedAppointmentComponent,
  },
  {
    path: 'timeslot',
    component: TimeslotComponent,
  },
  {
    path: 'timeslot-list',
    component: TimeslotListComponent,
  },
  {
    path: 'nurse',

    loadChildren: () =>
      import('src/app/nurse/nurse.module').then((m) => m.NurseModule),
  },
]

@NgModule({
  declarations: [
    DoctorsDashboardComponent,
    TimeslotComponent,
    TimeslotListComponent,
    RequestedAppointmentComponent,
    EditTimeslotComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatExpansionModule,
    FormsModule,
    MatDividerModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMomentDateModule,
    MomentDateModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorModule { }
