import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { SharedModule }   from '../shared/shared.module';
import { LoginPage } from '../pages/login.page';


const routes: Routes = [
  { path: '', component: LoginPage }
];

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class LoginModule {}
