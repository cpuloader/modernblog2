import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './config';
import { UtilsService } from './utils.service';
import { Post, Author, Comment, Image } from '../../json-objects';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl: string;
  private postsUrl: string;
  private profileUrl: string;
  private imagesUrl: string;

  constructor(private http: HttpClient,
              private utils: UtilsService,
              private cookieService: CookieService,
              private config: ConfigService) {

    this.apiUrl = this.config.getApiUrl();
    this.postsUrl = this.apiUrl + '/posts';
    this.profileUrl = this.apiUrl + '/accounts';
    this.imagesUrl = this.apiUrl + '/images';
  }

  private handleError(error: any): Observable<any> {
    let err = error || 'Error!';
    console.log(err.message || err);
    return throwError(err);
  }

  getPosts(page: number): Observable<any> {
    let url: string;
    if (page < 2) {
      url = `${this.postsUrl}/`;
    } else {
      url = `${this.postsUrl}/?page=${page}`;
    }
    return this.http.get(url);
  }

  getAuthorPosts(username: string, page: number): Observable<any> {
    let url: string;
    if (page < 2) {
      url = `${this.profileUrl}/${username}/posts/`;
    } else {
      url = `${this.profileUrl}/${username}/posts/?page=${page}`;
    }
    return this.http.get(url);
  }

  create(content: string, draft: boolean): Observable<Post> {
    const url = `${this.postsUrl}/`;
    return this.http
      .post<Post>(url, JSON.stringify({content: content, draft: draft}),
                 { headers: this.utils.makeCSRFandContentHeader() });
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}/`;
    return this.http.get<Post>(url);
  }

  update(post: Post): Observable<any> {
    const url = `${this.postsUrl}/${post.id}/`;
    return this.http
      .put<any>(url, JSON.stringify(post),
               { headers: this.utils.makeCSRFandContentHeader() });
  }

  destroy(id: number): Observable<any> {
    const url = `${this.postsUrl}/${id}/`;
    return this.http.delete(url, { headers: this.utils.makeCSRFHeader() });
  }

  // observable for passing posts for deleting
  private _onePost$: BehaviorSubject<Post> = new BehaviorSubject(null);

  set onePost(value: Post) {
    this._onePost$.next(value);
  }

  get onePost$(): Observable<Post> {
    return this._onePost$.asObservable();
  }

  createImage(parentPostOrComment: string, id: number, file: any): Observable<any> {
      const url = `${this.imagesUrl}/`;
      let formData: FormData = new FormData();
      formData.append("picture", file, file.name);
      formData.append(parentPostOrComment, `${id}`);
      const req = new HttpRequest('POST', url, formData, {
          reportProgress: true,
          headers: this.utils.makeCSRFHeader()
      });
      return this.http.request(req);
  }

  destroyImage(id: number): Observable<any> {
    const url = `${this.imagesUrl}/${id}/`;
    return this.http.delete(url, { headers: this.utils.makeCSRFHeader() });
  }

} // end of class


function mapPosts(response: any): [Post[], string] {
  let nextPage: string;
  if (response.next) {
     nextPage = response.next.slice(response.next.indexOf('page=') + 5);
  }
  return [response.results, nextPage]; // next page number
}
