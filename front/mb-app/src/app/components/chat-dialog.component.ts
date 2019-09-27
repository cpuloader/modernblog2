import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from "@angular/core";

import { Author, Chat, ChatMessage } from '../json-objects';
import { ChatService } from '../core/services/chat.service';
import { UtilsService } from '../core/services/utils.service';

@Component({
  selector: 'chat-dialog-sel',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  @Input() chat: Chat;
  @Input() chatters: Author[];
  @Input() loggedAuthor: Author;
  @Output() chatDestroyed: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('chatInput', { static: false }) chatInput: ElementRef;

  messages: ChatMessage[] = [];
  newMessage: ChatMessage;
  observer: any;
  error: any;
  recipient: string;
  nowTime: Date = new Date(0);
  chatMembers: Author[];                  // this is for title and online status
  redrawWindow: boolean = false;
  unreadMsgIds: number[] = [];
  cooldown: boolean = true;
  firstTime: boolean = true;

  constructor(private chatService: ChatService, private utils: UtilsService) {}

  visible = false;
  visibleAnimate = false;

  show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
    /*this.observer = setInterval(() => {             // main cycle
      //console.log('unread: ', this.unreadMsgIds);
      this.getMessages();
    }, 10000);*/
  }

  hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
    setTimeout(() => this.chatDestroyed.emit('destroy'), 1300);
    //clearInterval(this.observer);                   // destroy main cycle
  }

  hideError(): void {
    this.error = null;
  }

  getMessages(): void {
    this.chatService.getChatMessages(this.chat.id)
      .subscribe(messages => {
        for (let m of messages) {
          if (m.author.username !== this.loggedAuthor.username && !m.checked) {
            m.checked = true;                   // set received msgs as read
            //console.log('sending as checked: ', m);
            this.chatService.updateMessage(m)   // send msg to update as read
              .subscribe(
                () => {},
                err => {}
              );
          }
          let index = this.messages.findIndex(    // find message by id to prevent doubling
              function(elem) { return (elem.id === m.id) });
          if (index === -1) {
            this.messages.push(m);                // add to chat window if not found
            setTimeout(() => this.redrawWindow = !this.redrawWindow, 10);      // signal for autoscroll directive
          }
        }
        this.firstTime = false;
      },
      err => {
        this.utils.handleErrorDetails(err);
      });
  }

  onSubmit(): void {
    if (!this.cooldown || !this.newMessage.content) return;
    this.cooldown = false;                        // you can send only 1 msg in 2 sec
    this.chatInput.nativeElement.focus();         // set focus on input again
    setTimeout(() => this.cooldown = true, 2000);
    let messageToSend = <ChatMessage>({           // new message instance to send
      content: this.newMessage.content,
      chat: this.chat.id,
      author: this.loggedAuthor,
      checked: false
    });

    this.chatService.createMessage(messageToSend).subscribe(msg => {
      this.newMessage.content = '';             // clear input field
      let index = this.messages.findIndex(    // find message by id to prevent doubling
          function(elem) { return (elem.id === msg.id) });
      if (index === -1) this.messages.push(msg);
      setTimeout(() => this.redrawWindow = !this.redrawWindow); // change for autoscroll
    },
    err => {
      this.utils.handleErrorDetails(err);
    });
  }

  ngOnInit(): void {
    if (this.loggedAuthor && this.chat) {
      this.show();
      this.getMessages();
      this.chatMembers = this.nameFilter(this.chat.members, this.loggedAuthor);
    }
    if (!this.chat && this.chatters.length == 2)  {
      let newChat = new Chat();                        // make empty instance of just created chat
      newChat.members = [];
      newChat.messages = [];
      for (let chatter of this.chatters) {
        newChat.members.push(chatter);                 // collect chat members
      }
      this.chatService.createChat(newChat).subscribe(receivedChat => {
        this.chat = receivedChat;
        this.chatMembers = this.nameFilter(this.chat.members, this.loggedAuthor);
        this.show();
        this.getMessages();
      },
      err => {
        this.utils.handleErrorDetails(err);
      });
    }
    this.newMessage = new ChatMessage();
  }

  nameFilter(members: Author[], author: Author): Author[] {
    return members.filter(m => m.username !== author.username);
  }

  ngAfterViewInit(): void {
    this.chatInput.nativeElement.focus();   // not cool on mobile, keyboard enclose view
  }
}
