import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { Subscription } from 'rxjs';

import { Author, Chat, ChatMessage } from '../json-objects';
import { ChatService } from '../core/services/chat.service';
import { UtilsService } from '../core/services/utils.service';


@Component({
  selector: 'observer-sel',
  templateUrl: './observer.component.html'
})
export class ObserverComponent implements OnChanges {

  @Input() loggedAuthor: Author;

  @Output() openChatPanelFromObserver: EventEmitter<string> = new EventEmitter<string>();

  observer: any;
  messages: ChatMessage[] = [];
  error: any;

  constructor(private chatService: ChatService, private utils: UtilsService) {}

  private toggleRemoteSubscription: Subscription;

  startObserverCycle() {
    if (this.observer) return;
    this.observer = setInterval(() => {             // main cycle
      //console.log('unread: ', this.unreadMsgIds);
      this.getUnreadMessages();
    }, 60000);                                      // once in a minute
  }

  toggleRemote() {
    this.toggleRemoteSubscription = this.chatService.toggleObserver$ // subscribe for load msgs on demand
      .subscribe(flag => {
        if (flag === 'getNewMessages') {
          this.getUnreadMessages();
        }
    });
  }

  getUnreadMessages() {
    this.chatService.getUnreadChats().subscribe(msgs => {
      this.messages = msgs;
      this.chatService.newMessages = this.messages;    // send messages to chat panel subscription
    },
    err => {
      this.error = this.utils.handleErrorDetails(err);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loggedAuthor']) {
      if (changes['loggedAuthor'].currentValue && !changes['loggedAuthor'].previousValue) {
        // user logged in
        this.getUnreadMessages();                // get unread messages first time
        //this.startObserverCycle();               // start main cycle
        this.toggleRemote();                     // subscribe for request on demand
      } else if (!changes['loggedAuthor'].currentValue && changes['loggedAuthor'].previousValue) {
        // user logged out
        this.stopObserver();
      }
    }
  }

  stopObserver() {
    clearInterval(this.observer); // destroy main cycle
    this.observer = undefined;
    if (this.toggleRemoteSubscription) this.toggleRemoteSubscription.unsubscribe();
    this.messages = [];
  }

  ngOnDestroy(): void {
    this.stopObserver();
  }
}
