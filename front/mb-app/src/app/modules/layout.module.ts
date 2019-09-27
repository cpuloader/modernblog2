import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule }   from '../shared/shared.module';
import { LayoutPage } from '../pages/layout.page';
import { CreatePostComponent } from '../components/create-post.component';

const routes: Routes = [
  { path: '', component: LayoutPage }
];

@NgModule({
  declarations: [
    LayoutPage,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class LayoutModule {}
