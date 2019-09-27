import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { Router } from '@angular/router';
import { HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post, Author, Image } from '../json-objects';
import { PostsService } from '../core/services/posts.service';
import { AuthService } from '../core/services/auth.service';
import { UtilsService } from '../core/services/utils.service';
import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'create-post-dialog',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private postsService: PostsService,
    private utils: UtilsService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  post: Post = new Post();
  futureId: number = undefined;
  images: Image[] = [];
  loggedAuthor: Author;
  error: any;
  postCreatingState: string = 'not created';
  postHasImage: boolean;
  private createImageSub: Subscription;

  @ViewChild('textInput', { static: false }) input: ElementRef;

  @Output() postCreated: EventEmitter<Post> = new EventEmitter<Post>();

  ngOnInit(): void {
    this.loggedAuthor = this.authService.getMeFromStorage();
  }

  visible = false;
  visibleAnimate = false;

  show(): void {
    this.error = '';
    this.post = new Post();
    this.futureId = undefined;
    this.images = [];
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
      this.input.nativeElement.focus();
    });
  }

  hide(): void {
    this.post = new Post();
    this.images = [];
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);

    if (this.postCreatingState === 'empty prepared') {
      this.postsService.destroy(this.futureId).subscribe(
        () => {
          //console.log('empty post deleted', this.post.id);
          this.futureId = undefined;
        }, err => {
          this.error = this.utils.handleErrorDetails(err);
        });
    }
  }

  createPost(): void {
    if (!this.post.content) return;
    if (this.futureId) {
      //console.log('update post');
      this.post.id = this.futureId;
      this.post.draft = false;
      this.postsService.update(this.post).subscribe(newPost => {
        this.error = '';
        this.postCreated.emit(newPost);
        this.postCreatingState = 'completed';
        this.hide();
      },
      err => {
        this.error = this.utils.handleErrorDetails(err);
      });
    } else {
      //console.log('create post');
      this.postsService.create(this.post.content, false).subscribe(post => {
        //console.log('post created', post);
        this.postCreated.emit(post);
        this.postCreatingState = 'completed';
        this.hide();
        this.snackbarService.message = { text: 'Post created!'};
      },
      err => {
        this.error = this.utils.handleErrorDetails(err);
      });
    }
  }

  startUploadImages(event: any): void {
    if (!this.futureId) {
      this.postsService.create('_', true).subscribe(emptyPost => {
        this.futureId = emptyPost.id;
        this.postCreatingState = 'empty prepared';
        this.uploadImages(event);
      },
      err => {
        this.error = this.utils.handleErrorDetails(err);
      });
    } else {
      this.uploadImages(event);
    }
  }

  uploadImages(event: any): void {
    let files: File[] = event.target.files;
    if (files && files.length) {
      for (let file of files) {
        let ext = file.name.toLowerCase();
        if (ext.lastIndexOf('jpg') == -1 && ext.lastIndexOf('jpeg') == -1 &&
              ext.lastIndexOf('gif') == -1 && ext.lastIndexOf('png') == -1) {
          this.error = 'Wrong file type! JPG, GIF, PNG only';
          console.log('Wrong file type! JPG, GIF, PNG only');
          continue;
        }
        if (file['size'] && file.size > 1024*1024*5) {
          this.error = 'File is too big (> 5 MB), not added';
          console.log(file, 'File is too big (> 5 MB), not added');
          continue;
        }
        this.createImageSub = this.postsService.createImage('parent_post',this.futureId, file)
          .subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                  const progress = Math.round(100 * event.loaded / event.total);
                  //this.progressBarShow(progress);
                } else if (event instanceof HttpResponse) {
                  if (event.status == 201) {
                    this.images.push(event.body);
                  } else {
                    try {
                      this.error = event.body.error.error;
                    }
                    catch(err) {
                      this.error = 'Error!';
                    }
                  }
                }
            },
            err => { this.error = 'Error!'; },
            () => { this.createImageSub.unsubscribe(); console.log('finished!'); }
        );
      }
    }
  }

  deleteImage(imageId: number): void {
    if (!imageId) return;

    this.postsService.destroyImage(imageId)
      .subscribe(() => {
          //console.log('chosen image deleted', imageId);
          let index = this.images.findIndex(     // find image by id
                  function(elem) { return (elem.id === imageId) });
          this.images.splice(index, 1);          // delete from view
          this.error = '';
        },
        err => {
          this.error = this.utils.handleErrorDetails(err);
        });
  }

  ngOnDestroy() {
    if (this.createImageSub) this.createImageSub.unsubscribe();
  }
}
