import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './shared/default/default.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NurseModule } from './nurse/nurse.module';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'nurse',
        loadChildren: () =>
          import('./nurse/nurse.module').then((m) => m.NurseModule),
      },

      {
        path: 'patient',
        loadChildren: () =>
          import('src/app/patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'scheduling',
        loadChildren: () =>
          import('src/app/scheduling/scheduling.module').then((m) => m.SchedulingModule),
      },
    ],
  },
];



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    SharedModule,
    NurseModule,

    

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
