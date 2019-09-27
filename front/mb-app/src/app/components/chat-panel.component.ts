import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs';

import { Author, Chat, ChatMessage } from '../json-objects';
import { ChatService } from '../core/services/chat.service';

@Component({
  selector: 'chat-panel-sel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent {

  @Input() loggedAuthor: Author;
  @Input() chatPanelActivated: Author;
  @Output() chatOpened: EventEmitter<Chat> = new EventEmitter<Chat>();

  chats: Chat[];
  members: string[];
  chatStyles: any;
  chatWidth: string = '20px';
  chatPanelActive: boolean;
  newMessages: ChatMessage[] = [];
  error: any;
  loaded: boolean;

  constructor(private chatService: ChatService) {}

  private messagesSubscription: Subscription;

  setChatStyles(): void {
    this.chatStyles = {
      'width' : this.chatWidth
    }
  }

  showChatPanel(): void {
    let timeToClose: number;
    if (!this.chatPanelActive) {
      this.chatWidth = '200px'; timeToClose = 10;
      this.chatService.toggleObserver = 'getNewMessages';       // send signal to observer to get new msgs
      this.loadChats();                             // load all chats
    } else {
      this.chatWidth = '10px'; timeToClose= 1000;
      if (this.loaded) this.messagesSubscription.unsubscribe();      // unsub from incoming msgs
    }
    setTimeout(() => {
      this.setChatStyles();
    }, 10);
    setTimeout(() => {
      this.chatPanelActive = !this.chatPanelActive;
      //console.log('panel destroyed');
    }, timeToClose);
  }

  showChat(chat: Chat): void {
    this.chatOpened.emit(chat);
  }

  chatDelete(chat: Chat): void {
    let q: string;
    if (chat.members.length > 1) {
      q = 'Do you want to leave this chat?';
    } else {
      q = 'Do you want to delete this chat?';
    }
    let ask = confirm(q);
    if (!ask) { return; }
    this.chatService.deleteChat(chat.id).subscribe(
      () => {
        let index = this.chats.findIndex(                    // find chat by id
             function(elem) { return (elem.id === chat.id) });
        if (index !== -1) this.chats.splice(index, 1);       // delete from panel
      },
      err => console.log(err)
    );
  }

  loadChats(): void {
    if (!this.loggedAuthor) return;

    this.loaded = false;
    this.chatService.getAccountChats(this.loggedAuthor.username).subscribe(chats => {
      this.chats = chats;
      this.loaded = true;
      this.messagesSubscription = this.chatService.newMessages$ // subscribe for new messages incoming
        .subscribe(newMsgs => {
          this.newMessages = newMsgs;
          let notFromTheseChats:boolean = true;        // flag for msg from chat not in list
          for (let chat of this.chats) {
            let chatUnreadMsgs: number[] = [];
            for (let msg of this.newMessages) {
              //console.log('panel received msg:', msg);
              if (msg.chat === chat.id) {
                chatUnreadMsgs.push(msg.id);
                notFromTheseChats = false;
              }
            }
            chat.unreadMsgs = chatUnreadMsgs;
          }
          if (newMsgs.length && notFromTheseChats) {
            //console.log('reload all chats', newMsgs, notFromTheseChats);
            if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
            this.loadChats();                          // new chat added, we need to reload all
          }
        });
    },
    err => {
      console.log(err);
    });
  }

  getMembers(chat: Chat): string {
    let memberList: string[] = [];
    for (let member of chat.members) {
      memberList.push(member.username);
    }
    let result = memberList.join(', ');
    if (result.length > 26) {
      return result.slice(0, 26) + '...'
    } else {
      return memberList.join(', ');
    }
  }

  ngOnDestroy() {
    this.newMessages = [];
    if (this.messagesSubscription) this.messagesSubscription.unsubscribe();
  }

}
