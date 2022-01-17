import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import { SideNavComponent } from './side-nav/side-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InboxComponent } from './inbox/inbox.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ReplyNoteDialogComponent } from './reply-note-dialog/reply-note-dialog.component';
import { UserModule } from '../user/user.module';
// import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
    // children : [{
    //   path:'patient/patient-details',
    //   component: PatientDetailsComponent
    // }]
    children:[
      {
        path: 'patient',
        loadChildren: () =>
          import('src/app/patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'nurse',

        loadChildren: () =>
          import('src/app/nurse/nurse.module').then((m) => m.NurseModule),
      },
      {
        path: 'scheduling',
        loadChildren: () =>
          import('src/app/scheduling/scheduling.module').then(
            (m) => m.SchedulingModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('src/app/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'doctor',

        loadChildren: () =>
          import('src/app/doctor/doctor.module').then((m) => m.DoctorModule),
      },
    ]
  },
  
  {
    path: 'inbox',
    component: InboxComponent,
  },
  {
    path: 'nurse',
    loadChildren: () =>
      import('src/app/nurse/nurse.module').then((m) => m.NurseModule),
  },
  
];
@NgModule({
  declarations: [
    SidebarComponent,
    // DashboardComponent,
    DefaultComponent,
    InboxComponent,
    ReplyNoteDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    RouterModule.forChild(routes)
  ],
})
export class SharedModule {}
