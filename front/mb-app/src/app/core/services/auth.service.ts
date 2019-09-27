import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from './config';
import { Post, Author, Comment } from '../../json-objects';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string;
  private me: Author;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private config: ConfigService,
    private storageService: StorageService,
    private utils: UtilsService) {
      this.apiUrl = this.config.getApiUrl();
  }

  private _loggedAuthor$: BehaviorSubject<Author> = new BehaviorSubject(null);  // signals for login

  set loggedAuthor(data: Author) {
    this._loggedAuthor$.next(data);
    this.me = data;
  }

  get loggedAuthor$(): Observable<Author> {
    return this._loggedAuthor$.asObservable();
  }

  getMe(): Author {
    return this.me;
  }

  getMeFromStorage(): any {
    let author: any = this.storageService.get('user');
    if (author) {
      this.loggedAuthor = JSON.parse(author);
      return JSON.parse(author);
    } else {
      this.loggedAuthor = null;
      return false;
    }
  }

  setMeToStorage(author: Author) {
    this.unauthenticate();
    this.storageService.set('user', JSON.stringify(author));
    this.loggedAuthor = author;
  }

  private handleError(error: any): Observable<any> {
    let err = error || 'Error!';
    console.log(err.message || err);
    return throwError(err);
  }

  login(email: string, password: string): Observable<any> {
    let url: string = `${this.apiUrl}/auth/login/`;
    this.unauthenticate();
    return this.http.post<Author>(url, {
      email: email.toLowerCase(),
      password: password
    }, { headers: this.utils.makeCSRFHeader() });

  }

  logout(): Observable<any> {
    let url: string = `${this.apiUrl}/auth/logout/`;
    this.unauthenticate();
    return this.http.post(url, {}, { headers: this.utils.makeCSRFHeader() })
      .pipe((res) => this.afterLogout(res));
  }

  register(email: string, username: string, password: string): Observable<any> {
    let url: string = `${this.apiUrl}/accounts/`;
    return this.http.post(url, {
      username: username,
      email: email.toLowerCase(),
      password: password
    }, { headers: this.utils.makeCSRFandContentHeader() }).pipe(
      catchError(this.handleError)
    );
  }

  remindPwd(username: string): Observable<any> {
    const url = `${this.apiUrl}/passreminder/?username=${username}`;
    return this.http.get(url, { headers: this.utils.makeCSRFHeader() });
  }

  unauthenticate(): void {
    let stored = this.storageService.get('user');
    this.loggedAuthor = undefined;
    if (stored) {
      this.storageService.remove('user');
    }
  }

  afterLogout(res: any): any {
    console.log('logged out');
    //this.unauthenticate();
    this.router.navigate(['/']);
    return res;
  }

  setWindowCookie() {
    let expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 1);  // set cookies for 10 minutes
    this.cookieService.set('lastwindowfocus', 'focus', expireDate);
  }

  windowFocusTimeExpired(): boolean {
    const cookie = this.cookieService.get('lastwindowfocus');
    if (!cookie) return true;
    else return false;
  }
}
