import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './shared/default/default.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
// import { UserModule } from 'src/app/user/user.module';
import { UserModule } from './user/user.module';

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
        path: 'shared',
        loadChildren: () =>
          import('./shared/shared.module').then((m) => m.SharedModule),
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
        path: 'user',
        loadChildren: () =>
          import('src/app/user/user.module').then((m) => m.UserModule),
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
    // SharedModule,
    UserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
