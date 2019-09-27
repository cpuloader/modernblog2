import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { OmniModule } from '../core/omni.module';

import { PostsComponent } from '../components/posts.component';
import { PostComponent } from '../components/post.component';
import { LinkParserDirective } from '../directives/links.directive';

/*
this module declares things that used in lazy loaded modules only
*/

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    LinkParserDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OmniModule
  ],
  exports: [
    FormsModule,
    OmniModule,
    PostsComponent,
    PostComponent,
    LinkParserDirective
  ]
})
export class SharedModule {}
