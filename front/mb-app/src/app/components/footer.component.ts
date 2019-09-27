import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { StorageService } from '../core/services/storage.service';
import { Author } from '../json-objects';

@Component({
  selector: 'footer-sel',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  lang: string;

  constructor(public translate: TranslateService,
              private storage: StorageService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    let browserLang: string = storage.get('userlang');
    if (!browserLang) browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  @Input() loggedAuthor: Author;

  langChange(lang: string) {
    this.translate.use(lang);
    this.storage.set('userlang', lang);
  }

}
