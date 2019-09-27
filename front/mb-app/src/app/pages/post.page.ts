import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Author, Post, Comment } from '../json-objects';
import { PostUpdateComponent } from '../components/post-update.component';

import { PostsService } from '../core/services/posts.service';
import { CommentsService } from '../core/services/comments.service';
import { AuthService} from '../core/services/auth.service';
import { ConfigService} from '../core/services/config';
import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'sel-post-detail',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage implements OnInit {
  post: Post;
  comments: Comment[] = [];
  newComment: Comment;
  loaded: boolean;
  error:any;
  nextPage: number = 0;
  showNextPageButton: boolean;

  loggedAuthor: Author = null;
  private loggedSubscription: Subscription;

  canEditPost: boolean;

  @ViewChild(PostUpdateComponent, { static: false })
  updatePostDialog: PostUpdateComponent;

  @ViewChild('commentInput', { static: false }) commentInput: ElementRef;

  authorAvatar: any;

  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService,
    private authService: AuthService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private mainrouter: Router,
    private snackbarService: SnackbarService
  ) {}

  getCommentsForPost(): void {
    if (!this.post) return;
    this.commentsService.getPostComments(this.post.id, this.nextPage)
      .subscribe(
        res => {
          this.comments = res.results;
          this.loaded = true;
          this.nextPage = +res.next;
        },
        err => console.log('error!', err)
      );
  }

  loadMore(): void {
    this.commentsService.getPostComments(this.post.id, this.nextPage)
      .subscribe(
        res => {
          let newComments: Comment[];
          newComments = this.comments.slice(0);
          newComments = newComments.concat(res.results);
          this.comments = newComments;
          this.nextPage = +res.next;
        },
        err => console.log('error!', err)
      );
  }

  onPostUpdated(post: Post): void {
    this.post = post;
    this.snackbarService.message = { text: 'Post updated!'};
  }

  deletePost(): void {
    let ask = confirm('Do you want to delete this post?');
    if (!ask) { return;}
    this.postsService.destroy(this.post.id).subscribe(
      () => {
        //console.log('deleted! ', this.post);
        this.mainrouter.navigate(['/']);
      },
      err => {
        if (err.error && err.error.hasOwnProperty('detail')) {
          this.snackbarService.message = { text: 'Error!:' + err.error.detail};
        } else {
          this.snackbarService.message = { text: 'Error!' };
        }
      });
  }

  submitComment(): void {
    this.newComment.author = this.loggedAuthor;
    this.newComment.parent_post = this.post.id;
    this.commentsService.createComment(this.newComment)
      .subscribe(comment => {
        this.comments.unshift(comment);
        this.post.comments.push(comment.id);
        this.snackbarService.message = { text: 'Comment created!' };
        this.newComment = new Comment;
      },
      err => {
        if (err.error && err.error.hasOwnProperty('detail')) {
          this.error = err.error.detail;
        } else {
          this.error = 'Error!';
        }
      });
  }

  onCommentDeleted(comment: Comment): void {
    this.commentsService.deleteComment(comment.id).subscribe(
      () => {
        //console.log('deleted! ', comment);
        this.post.comments.shift();
        this.snackbarService.message = { text: 'Comment deleted!' };
      },
      err => {
          //console.log(err);
          if (err.error && err.error.hasOwnProperty('detail')) {
            this.snackbarService.message = { text: 'Error!:' + err.error.detail};
          } else {
            this.snackbarService.message = { text: 'Error!' };
          }
      });

      if (comment != null && this.comments.hasOwnProperty('length')) {
        for (let i = 0; this.comments.length; i++) {
          if (comment.id == this.comments[i].id) {
            this.comments.splice(i,1);
            return;
          }
        }
      }
  }

  checkAuthorship() {
    if (this.loggedAuthor && this.loggedAuthor.id === this.post.author.id)
      this.canEditPost = true;
    else
      this.canEditPost = false;
  }

  makeAvatar() {
    if (this.post.author.avatarimage) {
      this.authorAvatar = { 'backgroundImage' : 'url(' + this.post.author.avatarimage.picture_for_preview + ')' };
    } else
      this.authorAvatar = this.config.profilePlaceholder();
  }

  ngOnInit(): void {
    this.loggedAuthor = this.authService.getMe();
    this.newComment = new Comment();

    this.route.params.pipe(switchMap((params: Params) => this.postsService.getPost(params['id'])))
      .subscribe(post => {
        this.post = post;
        this.makeAvatar();
        this.getCommentsForPost();
        this.checkAuthorship();

        this.loggedSubscription = this.authService.loggedAuthor$ // subscribe for logged author
          .subscribe(author => {
            this.loggedAuthor = author;
            this.checkAuthorship();
          });
      }, err => {
        if (err.error && err.error.hasOwnProperty('detail') && err.error.detail === 'Not found.') {
          this.mainrouter.navigate(['page404']);
        }
      });
  }

  ngOnDestroy() {
    if (this.loggedSubscription) this.loggedSubscription.unsubscribe();
  }
}
