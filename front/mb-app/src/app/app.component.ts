import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Author, Chat } from './json-objects';
import { ChatPanelComponent } from './components/chat-panel.component';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService) {}

  author: Author = undefined;
  openChatPanel:boolean = false;

  private loggedSubscription: Subscription;

  onOpenChatPanel(event: string): void {
    this.openChatPanel = !this.openChatPanel;
  }

  ngAfterViewInit() {
    // subscribe for logged user change
    setTimeout(() => {
      this.loggedSubscription = this.authService.loggedAuthor$
        .subscribe(author => {
          this.author = author;
          //console.log('author updated', author);
        });
    });
  }

  ngOnInit() {
    // initial getting logged user for all app
    this.author = this.authService.getMeFromStorage();
    // todo: http get request for new logged user object here
  }

  ngOnDestroy(): void {
    this.loggedSubscription.unsubscribe();
  }
}
