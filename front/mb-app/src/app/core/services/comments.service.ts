import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConfigService } from './config';
import { UtilsService } from './utils.service';
import { Post, Author, Comment, Image } from '../../json-objects';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl: string;
  private commentsUrl: string;
  private postUrl: string;

  constructor(private http: HttpClient,
              private utils: UtilsService,
              private config: ConfigService) {
    this.apiUrl = this.config.getApiUrl();
    this.commentsUrl = this.apiUrl + '/comments';
    this.postUrl = this.apiUrl + '/posts';
  }

  private handleError(error: any): Observable<any> {
    let err = error || 'Error!';
    console.log(err.message || err);
    return throwError(err);
  }

  getPostComments(id: number, page: number): Observable<any> {
    let url: string;
    if (page < 2) {
      url = `${this.postUrl}/${id}/comments/`;
    } else {
      url = `${this.postUrl}/${id}/comments/?page=${page}`;
    }
    return this.http.get(url);
  }

  createComment(comment: Comment): Observable<Comment> {
    const url = `${this.commentsUrl}/`;
    return this.http
      .post<Comment>(url, JSON.stringify(comment),
           { headers: this.utils.makeCSRFandContentHeader() });
  }

  deleteComment(id: number): Observable<any> {
    const url = `${this.commentsUrl}/${id}/`;
    return this.http.delete(url, { headers: this.utils.makeCSRFHeader() });
  }

  private _onePost$: BehaviorSubject<Post> = new BehaviorSubject(null);

  set onePost(value: Post) {
    this._onePost$.next(value);
  }

  get onePost$(): Observable<Post> {
    return this._onePost$.asObservable();
  }
} // end of class

/*
function mapComments(response: Response): [Comment[], string] {
  let nextPage: string;
  if (response.json().next) {
     nextPage = response.json().next.slice(response.json().next.indexOf('page=') + 5);
     //console.log(nextPage);
  }
  return [response.json().results.map(ParseComment), // with pagination
    nextPage]; // next page number
  //return response.json().map(ParseComment); // no pagination
}*/

/*function mapComment(response: Response): Comment {
  return ParseComment(response.json());
}

function ParseComment(data: any): Comment {
  let author = <Author>({
    email: data.author.email,
    username: data.author.username,
    picture: data.author.picture,
    id: data.author.id,
    tagline: data.author.tagline
  });
  let comment = <Comment>({
    id: data.id,
    content: data.content,
    parent_post: data.parent_post,
    comment_images: data.comment_images,
    author: author,
    created_at: new Date(data.created_at)
  });
  //console.log('parsedComment: ', comment);
  return comment;
}*/
