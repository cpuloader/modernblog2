import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Author, Chat } from '../json-objects';
import { ChatPanelComponent } from '../components/chat-panel.component';
import { ChatService } from '../core/services/chat.service';

@Component({
    selector: 'chat-sel',
    templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) {}

  @Input() loggedAuthor: Author;
  @Input() openChatPanel: boolean;

  chatDialogActive: boolean;
  currentChat: Chat;
  chatters: Author[] = [];

  private authorSubscription: Subscription;

  @ViewChild(ChatPanelComponent, { static: false })
  chatPanelComponent: ChatPanelComponent;

  onChatOpened(chat: Chat): void {
    this.currentChat = chat;
    this.chatDialogActive = true;
    //console.log('chat opened', chat.id);
  }

  onChatDestroyed(event: string): void {
    //console.log('chat closed');
    this.currentChat = null;
    this.chatDialogActive = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['openChatPanel'] && !changes['openChatPanel'].firstChange) {
       this.chatPanelComponent.showChatPanel();
     }
  }

  ngOnInit() {
    this.authorSubscription = this.chatService.oneAuthor$ // subscribe for private chat creating
      .subscribe(chatter => {
        if (chatter != null && this.loggedAuthor) {
          //console.log('chat requested with ', chatter.username);
          this.currentChat = null;
          this.chatters = [this.loggedAuthor, chatter];
          this.chatDialogActive = true;
          this.chatService.oneAuthor = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }
}
