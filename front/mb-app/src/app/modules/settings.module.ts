import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule }   from '../shared/shared.module';
import { SettingsPage } from '../pages/settings.page';


const routes: Routes = [
  { path: '', component: SettingsPage }
];

@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class SettingsModule {}
