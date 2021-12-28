import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';
import { RouterModule, Routes } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
// import { SideNavComponent } from './side-nav/side-nav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserModule } from '../user/user.module';
const routes: Routes = [
  {
  path: "sidebar",
  component: SidebarComponent,
  },]
@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    DefaultComponent,
   
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
    FlexLayoutModule,UserModule
  ]
})
export class SharedModule { }
