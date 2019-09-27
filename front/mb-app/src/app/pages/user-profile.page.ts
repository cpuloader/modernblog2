import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
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

@Component({
  selector: 'user-profile-sel',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})

export class UserProfilePage implements OnInit {
  profile: Author;
  profilePosts: Post[];
  profileAvatar: any;
  private postsSubscription: Subscription;
  private avatarUpdater: Subscription;
  loggedAuthor: Author;

  loaded: boolean;
  nextPage: number = 0;
  showNextPageButton: boolean;
  error:any;

  @ViewChild('avaprogressbar', { static: false }) avaProgressBar: ElementRef;
  @ViewChild('avaprogress', { static: false }) avaProgress: ElementRef;

  constructor(
    private postsService: PostsService,
    private profileService: ProfileService,
    private authService: AuthService,
    private chatService: ChatService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
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

  updateAvatar(event: any): void {
    this.error = '';
    let file: File = event.target.files[0];
    //console.log(file);
    if (!file) return;
    let ext = file.name.toLowerCase();
    if (ext.lastIndexOf('jpg') == -1 && ext.lastIndexOf('jpeg') == -1 &&
          ext.lastIndexOf('gif') == -1 && ext.lastIndexOf('png') == -1) {
      //this.error = 'Wrong file type! JPG, GIF, PNG only';
      this.translate.get('ERRORS.WRONGTYPE').subscribe((res: string) => {
        this.error = res;
      });
      return;
    }
    if (file['size'] && file.size > 1024*1024*6) {
      //this.error = 'File is too big (> 5 MB), not added';
      this.translate.get('ERRORS.BIGFILE').subscribe((res: string) => {
        this.error = res;
      });
      return;
    }

    this.avatarUpdater = this.profileService.updateAvatar(file).subscribe(
        event => {
            if (event.type === HttpEventType.UploadProgress) {
                const progress = Math.round(100 * event.loaded / event.total);
                this.progressBarShow(progress);
            } else if (event instanceof HttpResponse) {
                if (event.status == 201) {
                    this.profile.avatarimage = event.body;
                    this.makeAvatar();
                    this.authService.setMeToStorage(this.profile); // update logged author
                } else {
                    try {
                        this.error = event.body.error.error;
                    }
                    catch(err) {
                      this.translate.get('ERRORS.ERROR').subscribe((res: string) => {
                        this.error = res;
                      });
                    }
                }
            }
        },
        err => { this.error = 'Error!'; },
        () => this.avatarUpdater.unsubscribe()
      );
  }

  progressBarShow(progress: number): void {
    this.renderer.setStyle(this.avaProgressBar.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.avaProgress.nativeElement, 'width', progress.toString() + '%');
    this.renderer.setAttribute(this.avaProgress.nativeElement, 'aria-valuenow', progress.toString());
    if (progress == 100) {
      this.renderer.setStyle(this.avaProgressBar.nativeElement, 'display', 'none');
    }
  }

  makeAvatar() {
    if (this.profile.avatarimage) {
      this.profileAvatar = { 'backgroundImage' : 'url(' + this.profile.avatarimage.picture_for_profile + ')' };
    } else
      this.profileAvatar = this.config.profilePlaceholder();
  }

  ngOnInit(): void {
    this.loggedAuthor = this.authService.getMe();
    if (!this.loggedAuthor) this.router.navigateByUrl('/page404');

    this.profileService.getAuthor(this.loggedAuthor.username).subscribe(author => {
        this.profile = author;
        this.authService.loggedAuthor = author; // update in service
        this.makeAvatar();

        //console.log(this.profile);
        this.getProfilePosts();
      }, err => {
        if (err.error && err.error.detail === 'Not found.') {
          this.router.navigateByUrl('/page404');
        }
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
    if (this.avatarUpdater) this.avatarUpdater.unsubscribe();
  }
}
