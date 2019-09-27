import { Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
//import { ChangeDetectorRef } from "@angular/core";
import { Router } from '@angular/router';

import { Post, Author } from '../json-objects';
import { WindowRef } from '../core/services/window';
import { PostsService } from '../core/services/posts.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnChanges {
  columns: Post[][];

  @Input() loggedAuthor: Author;
  @Input() posts: Post[];

  innerWidth: number;
  cooldown: boolean = true;

  constructor(private winRef: WindowRef, private postsService: PostsService,
    private authService: AuthService) {
    //let getWindow = () => {
    //  return winRef.nativeWindow.innerWidth;
    //};

    winRef.nativeWindow.onresize = () => {
      //console.log('window changed');
      if (this.cooldown) {         // check only once in 1 second to avoid massive redraws
        setTimeout(() => {
          this.columns = render(this.posts);
          this.cooldown = true;
        }, 1000);
      }
      this.cooldown = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['posts'] && changes['posts'].currentValue) {
       //console.log('posts changed!', this.posts);
       this.columns = render(this.posts);
     }
  }
} //end of class

function render(posts: any): any {
  let columns: any = [];
  if (!posts.hasOwnProperty('length') && !posts.length) {
    return null;
  }
  for (let i = 0; i < calculateNumberOfColumns(); ++i) {
    columns.push([]);
  }
  /*
  for (let i = 0; i < posts.length; ++i) {
    let column = approximateShortestColumn(columns);
    //console.log(posts[i]);
    columns[column].push(posts[i]);
  }*/

  for (let i = 0; i < posts.length; i) {
    for (let j = 0; j < columns.length; j++) {
      if (i == posts.length) break;
      //console.log(columns, j, posts[i]);
      columns[j].push(posts[i]);
      i++;
    }
  }
  //console.log(posts.length, 'posts rendered', columns.length, 'columns');
  return columns;

  function calculateNumberOfColumns(): number {
    let width: number;
    width = document.documentElement.clientWidth;
    //console.log(width);
    if (width >= 1200) {
      return 4;
    } else if (width >= 992) {
      return 3;
    } else if (width >= 768) {
      return 2;
    } else {
      return 1;
    }
  }

  function approximateShortestColumn(columns: any): any {
    let scores = columns.map(columnMapFn);
    let self = this;
    return scores.indexOf(Math.min.apply(self, scores));

    function columnMapFn(column: any): any {
      let lengths = column.map(function (element: any): any {
        return element.content.length;
      });
      return lengths.reduce(sum, 0) * column.length;
    }

    function sum(m: number, n: number): number {
      return m + n;
    }
  }
}   //end of render
