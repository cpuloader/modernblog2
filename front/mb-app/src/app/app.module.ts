import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule }    from './app-routing.module';
import { CoreModule }          from './core/core.module';
import { OmniModule }          from './core/omni.module';

import { AppComponent }        from './app.component';
import { NavbarComponent }     from './components/navbar.component';
import { FooterComponent }     from './components/footer.component';
import { ChatComponent }       from './components/chat.component';
import { ChatPanelComponent }  from './components/chat-panel.component';
import { ChatDialogComponent } from './components/chat-dialog.component';
import { ChatWindowDirective } from './directives/chat-window.directive';
import { ObserverComponent }   from './components/observer.component';
import { SnackbarComponent }   from './components/snackbar.component';
import { UserFloaterToolsComponent } from './components/user-floater.component'

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/static/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    CoreModule,
    OmniModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ChatComponent,
    ChatPanelComponent,
    ChatDialogComponent,
    ChatWindowDirective,
    SnackbarComponent,
    ObserverComponent,
    UserFloaterToolsComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
