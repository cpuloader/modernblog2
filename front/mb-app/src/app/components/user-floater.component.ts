import { Component, Input, OnInit, OnDestroy } from "@angular/core";

import { Post, Author } from '../json-objects';
import { ChatService } from '../core/services/chat.service';

@Component({
  selector: 'user-floater-tools-sel',
  templateUrl: './user-floater.component.html',
  styleUrls: ['./user-floater.component.scss']
})
export class UserFloaterToolsComponent {

  constructor(private chatService: ChatService) {}

  @Input()author: Author;
  @Input()loggedAuthor: Author;

  visible: boolean = true; 
  floaterStyles: any;

  setFloaterStyles(): void {
    this.floaterStyles = {
      'display' : this.visible ? 'block' : 'none'
    }
  }

  mouseLeave() {
    this.visible = false;
    this.setFloaterStyles();
  }

  sendMessage(): void {
    //console.log('send message from ' + this.loggedAuthor.username + ' to ' + this.author.username);
    if (this.loggedAuthor.username !== this.author.username) {
      this.chatService.oneAuthor = this.author;    // send signal to open chat
    }
    this.mouseLeave();
  }
}
