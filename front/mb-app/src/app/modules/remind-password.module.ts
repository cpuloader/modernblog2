import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule }   from '../shared/shared.module';
import { RemindPasswordPage } from '../pages/remind-password.page';


const routes: Routes = [
  { path: '', component: RemindPasswordPage }
];

@NgModule({
  declarations: [
    RemindPasswordPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class RemindPasswordModule {}
