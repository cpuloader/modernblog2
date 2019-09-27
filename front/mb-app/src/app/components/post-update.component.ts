import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post, Author, Image } from '../json-objects';
import { PostsService } from '../core/services/posts.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'post-update-dialog',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent {

  constructor(
    private postsService: PostsService,
    private authService: AuthService) {}

  @Input() post: Post;
  @Input() loggedAuthor: Author;
  @Output() postUpdated: EventEmitter<Post> = new EventEmitter<Post>();

  @ViewChild('textInput', { static: false }) input: ElementRef;

  updatedPost: Post = new Post();
  images: Image[] = [];
  newImages: Image[] = [];                       // list to delete on cancel update
  error: any;
  updatePostState: string = 'empty';
  visible = false;
  visibleAnimate = false;
  private createImageSub: Subscription;

  show(): void {
    this.error = '';
    this.updatedPost = JSON.parse(JSON.stringify(this.post)); // make temporary deep copy
    //console.log(this.updatedPost);
    this.images = this.updatedPost.post_images;
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
      //this.input.nativeElement.focus();
    });
  }

  hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
    if (this.updatePostState === 'has new unused images') {
      for (let newImage of this.newImages) {
        if (!newImage.id) continue;
        this.postsService.destroyImage(newImage.id).subscribe(() => {
          //console.log('unused image deleted', newImage.id);
          let index = this.newImages.findIndex(     // find image by id
                  function(elem) { return (elem.id === newImage.id) });
          this.newImages.splice(index, 1);          // delete from list
          },
          err => console.error(err)
        );
      }
    }
  }

  postUpdate(): void {
    if (!this.post) { return };
    this.postsService.update(this.updatedPost).subscribe(
      post => {
        //console.log('updated! ', post);
        this.error = '';
        this.postUpdated.emit(post);
        this.updatePostState = 'post updated'
        this.hide();
      },
      err => {
        if (err.error && err.error.hasOwnProperty('detail')) {
          this.error = err.detail;
        } else {
          this.error = 'Error!';
        }
      });
  }

  uploadImages(event: any): void {
    let files: File[] = event.target.files;
    this.error = '';
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
        this.createImageSub = this.postsService.createImage('parent_post',this.post.id, file)
          .subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                  const progress = Math.round(100 * event.loaded / event.total);
                  //this.progressBarShow(progress);
                } else if (event instanceof HttpResponse) {
                  if (event.status == 201) {
                    this.images.push(event.body);
                    this.newImages.push(event.body);
                    this.updatePostState = 'has new unused images';
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
            () => this.createImageSub.unsubscribe()
        );
      }
    }
  }

  deleteImage(image: Image): void {
    if (!image.id) return;
    this.postsService.destroyImage(image.id).subscribe(
      () => {
        //console.log('chosen image deleted', image.id);
        let index = this.images.findIndex(             // find image by id
                function(elem) { return (elem.id === image.id) });
        this.images.splice(index, 1);                  // delete from view
        index = this.newImages.findIndex(              // find image by id
                function(elem) { return (elem.id === image.id) });
        if (index > -1) {
          this.newImages.splice(index, 1);             // remove from list to delete on hide
        }
        this.error = '';
      },
      err => {
        if (err.error && err.error.hasOwnProperty('detail')) {
          this.error = err.error.detail;
        } else {
          this.error = 'Error!';
        }
      });
  }

  ngOnDestroy() {
    if (this.createImageSub) this.createImageSub.unsubscribe();
  }
}
