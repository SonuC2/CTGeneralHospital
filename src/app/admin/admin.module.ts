import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PatientListComponent } from './patient-list/patient-list.component';
import { HomeComponent } from './home/home.component';
import {ChartModule} from 'primeng/chart';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {MatChipsModule} from '@angular/material/chips'
import {MatDialogModule} from '@angular/material/dialog';
import {CardModule} from 'primeng/card';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ApprovePatientComponent } from './approve-patient/approve-patient.component';
import { EditUserComponent } from './edit-user/edit-user.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register-user',
    component: RegisterUserComponent,
  },
  {
    path: 'patients',
    component: PatientListComponent,
  },
  {
    path: 'edit-user/:index',
    component: EditUserComponent,
  },
  {
    path: 'employee-details',
    component: EmployeeDetailsComponent,
    children:[{path:'edit-user', component:EditUserComponent}]
  },
  {
    path: 'patient-details',
    component: ApprovePatientComponent,
  },
  {
    path: 'nurse',
    loadChildren: () =>
    import('src/app/nurse/nurse.module').then((m) => m.NurseModule),
  },
];
@NgModule({
  declarations: [
    AdminComponent,
    RegisterUserComponent,
    PatientListComponent,
    HomeComponent,
    EmployeeDetailsComponent,
    ApprovePatientComponent,
    EditUserComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    ChartModule,
    CardModule,
    ToggleButtonModule,
    MatChipsModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
})
export class AdminModule {}
