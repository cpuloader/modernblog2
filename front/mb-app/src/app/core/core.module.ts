import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { ConfigService }       from './services/config';
import { WindowRef }           from './services/window';
import { StorageService }      from './services/storage.service';
import { AuthService }         from './services/auth.service';
import { ProfileService }      from './services/profile.service';
import { PostsService }        from './services/posts.service';
import { CommentsService }     from './services/comments.service';
import { ChatService }         from './services/chat.service';
import { UtilsService }        from './services/utils.service';
import { SnackbarService }     from './services/snackbar.service';

/*
this module declares all services
*/

@NgModule({
  declarations: [],
  providers: [
    CookieService
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class CoreModule {}
