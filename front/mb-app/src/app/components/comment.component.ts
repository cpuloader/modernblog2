import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";

import { Comment, Author } from '../json-objects';
import { CommentsService } from '../core/services/comments.service';
import { ConfigService } from '../core/services/config';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(
    private config: ConfigService,
    private commentsService: CommentsService) {}

  @Input() comment: Comment;
  @Input() loggedAuthor: Author;
  @Output() commentDeleted: EventEmitter<Comment> = new EventEmitter<Comment>();

  authorPicture: string;
  canDeleteComment: boolean;
  commentAvatar: any;

  commentDelete(): void {
    let ask = confirm('Do you want to delete this comment?');
    if (!ask) { return; }
    this.commentDeleted.emit(this.comment);
  }

  makeAvatar() {
    if (this.comment && this.comment.author.avatarimage) {
      this.commentAvatar = { 'backgroundImage' : 'url(' + this.comment.author.avatarimage.picture_for_preview + ')' };
    } else
      this.commentAvatar = this.config.commentAvatarPlaceholder();
  }

  ngOnInit(): void {
    this.makeAvatar();

    if (this.loggedAuthor && this.loggedAuthor.id == this.comment.author.id) {
      this.canDeleteComment = true;
    }
  }
}
