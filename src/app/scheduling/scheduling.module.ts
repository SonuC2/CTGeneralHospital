import { NgModule } from '@angular/core';
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
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CalenderAddAppointmentComponent } from './calender-add-appointment/calender-add-appointment.component';
import { CalenderComponent } from './calender/calender.component';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CommonModule } from '@angular/common';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  {
    path: 'calender',
    component: CalenderComponent,
  },
  {
    path: 'appointment-calendar',
    component: CalenderAddAppointmentComponent,
  },
  {
    path: 'appointment-list',
    component: AppointmentListComponent,
  },
  {
    path: 'edit-appointment/:index',
    component: EditAppointmentComponent,
  },
];

@NgModule({
  declarations: [
    CalenderComponent,
    CalenderAddAppointmentComponent,
    AddAppointmentsComponent,
    AppointmentListComponent,
    EditAppointmentComponent,
    DialogComponent,
  ],
  imports: [
    // ScheduleModule,
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
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDividerModule,
    MatProgressBarModule,
    MatChipsModule,
    ScheduleModule,
    MatMomentDateModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
  ],
})
export class SchedulingModule {}
