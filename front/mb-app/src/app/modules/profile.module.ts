import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProfilePage } from '../pages/profile.page';

const routes: Routes = [
  { path: '', component: ProfilePage }
];

@NgModule({
  declarations: [
    ProfilePage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class ProfileModule {}
