import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './shared/default/default.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NurseModule } from './nurse/nurse.module';
import { UserModule } from './user/user.module';
import { LoginregistrationHomepageComponent } from './user/loginregistration-homepage/loginregistration-homepage.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
/*my changes defaultcomponent replace with login component*/
    children: [
     
    /* {
        path: '',
        component: LoginregistrationHomepageComponent,
      },*/
      {
        path: '',
        component: LoginregistrationHomepageComponent,
        
      },
     /* {
        path: 'dashboard',
        component: DashboardComponent,
        
      },*/
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
      /*my change*/
      {
        path: 'user',
        loadChildren: () =>
          import('src/app/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'shared',
        loadChildren: () =>
          import('src/app/shared/shared.module').then((m) => m.SharedModule),
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
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
