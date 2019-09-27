import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DateFieldPipe } from '../pipes/date-field.pipe';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/static/i18n/', '.json');
}


/*
this module declares things that used in ALL app
*/

@NgModule({
  declarations: [
    DateFieldPipe
  ],
  providers: [],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    TranslateModule,
    DateFieldPipe
  ]
})
export class OmniModule {}
