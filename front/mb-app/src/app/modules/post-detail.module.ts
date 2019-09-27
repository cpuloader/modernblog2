import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PostPage } from '../pages/post.page';
import { PostUpdateComponent } from '../components/post-update.component';
import { CommentComponent } from '../components/comment.component';


const routes: Routes = [
  { path: '', component: PostPage }
];

@NgModule({
  declarations: [
    PostPage,
    PostUpdateComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: []
})
export class PostDetailModule {}
