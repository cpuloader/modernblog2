import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { Subscription } from 'rxjs';

import { Author, ChatMessage } from '../json-objects';
import { AuthService } from '../core/services/auth.service';
import { ChatService } from '../core/services/chat.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges {

  constructor(private authService: AuthService, private chatService: ChatService) {}

  @Input() loggedAuthor: Author;
  @Output() openChatPanelFromNavbar: EventEmitter<boolean> = new EventEmitter<boolean>();

  private messagesSubscription: Subscription;
  private logoutSub: Subscription;

  newMessages: ChatMessage[] = [];
  haveNew: boolean;
  error: any;

  logout() {
    this.logoutSub = this.authService.logout().subscribe();
  }

  openPanel(): void {
    this.openChatPanelFromNavbar.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggedAuthor']) {
      if (changes['loggedAuthor'].currentValue && !changes['loggedAuthor'].previousValue) {
        // user logged in
        this.messagesSubscription = this.chatService.newMessages$ // subscribe for new messages from observer
          .subscribe(newMsgs => {
            this.newMessages = newMsgs;
          });
      } else if (!changes['loggedAuthor'].currentValue && changes['loggedAuthor'].previousValue) {
        this.newMessages = [];
        if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
      }
    }
  }

  ngOnDestroy(): void {
    this.newMessages = [];
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
    if (this.logoutSub) this.logoutSub.unsubscribe();
  }
}
