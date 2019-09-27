import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";

import { Post, Author } from '../json-objects';
import { PostsService } from '../core/services/posts.service';
import { ProfileService } from '../core/services/profile.service';
import { SnackbarService } from '../core/services/snackbar.service';
import { ConfigService } from '../core/services/config';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {

  constructor(
    private config: ConfigService,
    private postsService: PostsService,
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) {}

  @Input() post: Post;
  @Input() loggedAuthor: Author;

  canDelete: boolean;
  readmore: boolean = false;
  showFloaterTools: boolean = false;
  postAvatar: any;

  destroy(): void {
    let ask = confirm('Do you want to delete this post?');
    if (!ask) { return;}
    let postTemp = this.post;
    this.postsService.destroy(this.post.id).subscribe(
      () => {
        //console.log('post deleted');
        this.postsService.onePost = postTemp;
        this.snackbarService.message = { text: 'Post deleted!'};
      }, err => console.log(err));
  }

  mouseEnter() {
    if (!this.loggedAuthor) return;

    if (this.loggedAuthor.id !== this.post.author.id) {
      this.showFloaterTools = true;
    }
  }

  mouseLeave() {
    this.showFloaterTools = false;
  }

  makeAvatar() {
    if (this.post && this.post.author.avatarimage) {
      this.postAvatar = { 'backgroundImage' : 'url(' + this.post.author.avatarimage.picture_for_preview + ')' };
    } else
      this.postAvatar = this.config.postAvatarPlaceholder();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggedAuthor']) {
      if (!changes['loggedAuthor'].currentValue) {
        this.canDelete = false;
      } else {
        this.canDelete = true;
      }
      if (this.loggedAuthor && this.post.author.id === this.loggedAuthor.id) {
          this.post.author.avatarimage = this.loggedAuthor.avatarimage;
          this.makeAvatar();
      }
    }
  }

  ngOnInit(): void {
    this.makeAvatar();

    if (this.loggedAuthor && this.loggedAuthor.id === this.post.author.id) {
      this.canDelete = true;
    }
    if (this.post.content && this.post.content.length > 340 ) {
      this.post.content = this.post.content.slice(0, 340) + '...';
      this.readmore = true;
    }
  }

}
