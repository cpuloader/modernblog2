import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule }   from '../shared/shared.module';
import { RegisterPage } from '../pages/register.page';


const routes: Routes = [
  { path: '', component: RegisterPage }
];

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class RegisterModule {}
