import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Author, Post } from '../json-objects';

import { ProfileService } from '../core/services/profile.service';
import { PostsService } from '../core/services/posts.service';
import { AuthService } from '../core/services/auth.service';
import { ChatService } from '../core/services/chat.service';
import { ConfigService } from '../core/services/config';
import { UtilsService } from '../core/services/utils.service';

@Component({
  selector: 'sel-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})

export class ProfilePage implements OnInit {
  profile: Author;
  profilePosts: Post[];
  profileAvatar: any;
  private postsSubscription: Subscription;
  private loggedSubscription: Subscription;
  loggedAuthor: Author;
  loaded: boolean;
  nextPage: number = 0;
  showNextPageButton: boolean
  error:any;

  constructor(
    private postsService: PostsService,
    private profileService: ProfileService,
    private authService: AuthService,
    private chatService: ChatService,
    private config: ConfigService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.profileAvatar = this.config.profilePlaceholder();
  }

  getProfilePosts(): void {
    if (!!this.profile) {
      this.postsService.getAuthorPosts(this.profile.username, this.nextPage)
        .subscribe(res  => {
          this.profilePosts = res.results;
          this.loaded = true;
          this.nextPage = +res.next;
        },
        err => console.log(err));
    }
  }

  loadMore(): void {
    this.postsService.getAuthorPosts(this.profile.username, this.nextPage)
      .subscribe(res => {
        let newPosts: Post[];
        newPosts = this.profilePosts.slice(0);
        newPosts = newPosts.concat(res.results);
        this.profilePosts = newPosts;
        this.nextPage = +res.next;
      },
      err => console.log(err));
  }

  sendMessage(): void {
    if (this.loggedAuthor.username !== this.profile.username) {
      this.chatService.oneAuthor = this.profile;
    }
  }

  makeAvatar() {
    if (this.profile.avatarimage) {
      this.profileAvatar = { 'backgroundImage' : 'url(' + this.profile.avatarimage.picture_for_profile + ')' };
    } else
      this.profileAvatar = this.config.profilePlaceholder();
  }

  ngOnInit(): void {
    this.route.params.pipe(
        switchMap((params: Params) => this.profileService.getAuthor(params['username']))
      ).subscribe(author => {
        this.profile = author;
        this.makeAvatar();
        this.getProfilePosts();
      }, err => {
        if (err.error && err.error.detail === 'Not found.') {
          this.router.navigateByUrl('/page404');
        }
      });

    this.loggedSubscription = this.authService.loggedAuthor$ // subscribe for logged author
      .subscribe(author => {
        this.loggedAuthor = author;
      });

    this.postsSubscription = this.postsService.onePost$ // subscribe for deletion obs
      .subscribe(delPost => {
         if (delPost) {
           for (let i = 0; this.profilePosts.length; i++) {
             if (delPost.id == this.profilePosts[i].id) {
               let newPosts = this.profilePosts.slice(0);
               newPosts.splice(i,1);
               this.profilePosts = newPosts;
               this.postsService.onePost = null; // reset observer
               return;
             }
           }
         }
      });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
    this.loggedSubscription.unsubscribe();
  }
}
