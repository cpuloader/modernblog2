import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './config';
import { UtilsService } from './utils.service';

import { Author, Avatar } from '../../json-objects';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl: string;
  private authorUrl: string;
  private avatarUrl: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private utils: UtilsService,
              private config: ConfigService) {
    this.apiUrl = this.config.getApiUrl();
    this.authorUrl = this.apiUrl + '/accounts';
    this.avatarUrl = this.apiUrl + '/avatars';
  }

  getAuthor(username: string): Observable<Author> {
    const url = `${this.authorUrl}/${username}/`;
    return this.http.get<Author>(url);
  }

  getAuthors(): Observable<any> {
    const url = `${this.authorUrl}/`
    return this.http.get(url);
  }

  update(author: Author): Observable<any> {
    const url = `${this.authorUrl}/${author.username}/`;
    let tempAuthor = JSON.parse(JSON.stringify(author));
    if (!tempAuthor.password)
      delete tempAuthor.password;
    if (!tempAuthor.confirm_password)
      delete tempAuthor.confirm_password;
    delete tempAuthor.picture;
    return this.http.put(url, tempAuthor,
           { headers: this.utils.makeCSRFandContentHeader() });
  }

  destroy(id: number): Observable<any> {
    const url = `${this.authorUrl}/${id}/`;
    return this.http.delete(url, { headers: this.utils.makeCSRFHeader() });
  }

  updateAvatar(file: any): Observable<any> {
      const url = `${this.avatarUrl}/`;
      let formData: FormData = new FormData();
      formData.append("picture", file, file.name);
      const req = new HttpRequest('POST', url, formData, {
          reportProgress: true,
          headers: this.utils.makeCSRFHeader()
      });
      return this.http.request(req);
  }

}
