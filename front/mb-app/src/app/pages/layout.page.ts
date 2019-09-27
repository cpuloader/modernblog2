import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post, Author } from '../json-objects';
import { CreatePostComponent } from '../components/create-post.component';
import { PostsService } from '../core/services/posts.service';
import { AuthService } from '../core/services/auth.service';
import { WindowRef } from '../core/services/window';

@Component({
  selector: 'layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss']
})
export class LayoutPage implements OnInit, AfterViewInit {

  layoutPosts: Post[];
  loaded: boolean;
  nextPage: number = 0;
  windowFocusListener: any;

  loggedAuthor: Author;
  private loggedSubscription: Subscription;
  private postsSubscription: Subscription;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private windowRef: WindowRef
  ) { }

  @ViewChild(CreatePostComponent, { static: false })
  createPostDialog: CreatePostComponent;

  windowFocusChanged(): void {        // reget info on page reopen
    if (!this.windowRef.document.hidden && this.authService.windowFocusTimeExpired()) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  onPostCreated(post: Post): void {
    let newPosts: Post[];
    newPosts = this.layoutPosts.slice(0); // create new array for ngOnchange trigger
    newPosts.unshift(post);
    this.layoutPosts = newPosts;
  }

  loadMore(): void {
    this.postsService.getPosts(this.nextPage).subscribe(
      res => {
        let newPosts: Post[];
        newPosts = this.layoutPosts.slice();
        newPosts = newPosts.concat(res.results);
        this.layoutPosts = newPosts;
        this.nextPage = +res.next;
      },
      err => console.log('error!', err)
    );
  }

  ngAfterViewInit(): void {
    this.postsService.getPosts(this.nextPage).subscribe(
      res => {
        this.layoutPosts = res.results;
        this.loaded = true;
        this.nextPage = +res.next;
      },
        err => console.log('error!', err)
      );

    setTimeout(() => {
      this.loggedSubscription = this.authService.loggedAuthor$ // subscribe for logged author
        .subscribe(author => {
          this.loggedAuthor = author;
        });
    });

    this.postsSubscription = this.postsService.onePost$ // subscribe for deletion obs
      .subscribe(delPost => {
         if (delPost != null && this.layoutPosts.hasOwnProperty('length')) {
           for (let i = 0; this.layoutPosts.length; i++) {
             if (delPost.id == this.layoutPosts[i].id) {
               let newPosts = this.layoutPosts.slice(0);
               newPosts.splice(i,1);
               this.layoutPosts = newPosts;
               this.postsService.onePost = null;
               return;
             }
           }
         }
    });
  }

  ngOnInit(): void {
    // initial getting logged user for all app
    this.loggedAuthor = this.authService.getMeFromStorage();
    this.nextPage = 0;

    /*this.authService.setWindowCookie();
    if (this.windowRef.document.addEventListener) {
      this.windowFocusListener = this.windowFocusChanged.bind(this);
      this.windowRef.document.addEventListener("visibilitychange", this.windowFocusListener);
    }*/
  }

  ngOnDestroy(): void {
    this.layoutPosts = [];
    this.postsSubscription.unsubscribe();
    this.loggedSubscription.unsubscribe();

    /*if (this.windowRef.document.addEventListener) {
      this.windowRef.document.removeEventListener("visibilitychange", this.windowFocusListener);
    }*/
  }
}
