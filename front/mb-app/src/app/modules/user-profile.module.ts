import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UserProfilePage } from '../pages/user-profile.page';

const routes: Routes = [
  { path: '', component: UserProfilePage }
];

@NgModule({
  declarations: [
    UserProfilePage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class UserProfileModule {}
