import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from './config';
import { UtilsService } from './utils.service';
import { Author, Chat, ChatMessage } from '../../json-objects';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl: string;
  private chatUrl: string = 'api/v1/chats';
  private messageUrl = 'api/v1/messages';
  private accountUrl = 'api/v1/accounts';
  private observerUrl = 'api/v1/observer';

  constructor(private http: HttpClient,
              private utils: UtilsService,
              private config: ConfigService) {
    this.apiUrl = this.config.getApiUrl();
    this.chatUrl = this.apiUrl + '/chats';
    this.messageUrl = this.apiUrl + '/messages';
    this.accountUrl = this.apiUrl + '/accounts';
    this.observerUrl = this.apiUrl + '/observer';
  }

  private handleError(error: any): Observable<any> {
    let err = error || 'Error!';
    console.log(err.message || err);
    return throwError(err);
  }

  getChatMessages(id: number, unread?: string): Observable<ChatMessage[]> {
    let url: string;
    if (unread) {
      url = `${this.chatUrl}/${id}/messages/?unread=true`;
    } else {
      url = `${this.chatUrl}/${id}/messages/`;
    }
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAccountChats(username: string): Observable<Chat[]> {
    const url = `${this.accountUrl}/${username}/chats/`;
    return this.http.get(url).pipe(
        catchError(this.handleError)
      );
  }

  getUnreadChats(): Observable<ChatMessage[]> {
    const url = `${this.observerUrl}/`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createChat(chat: Chat): Observable<Chat> {
    const url = `${this.chatUrl}/`;
    return this.http
      .post(url, JSON.stringify(chat),
           { headers: this.utils.makeCSRFHeader().set("Content-Type", "application/json") })
      .pipe(
        catchError(this.handleError)
      );
  }

  createMessage(message: ChatMessage): Observable<ChatMessage> {
    const url = `${this.messageUrl}/`;
    return this.http
      .post(url, JSON.stringify(message),
           { headers: this.utils.makeCSRFHeader().set("Content-Type", "application/json") })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMessage(message: ChatMessage): Observable<ChatMessage> {
    const url = `${this.messageUrl}/${message.id}/`;
    return this.http
      .put(url, JSON.stringify(message),
          { headers: this.utils.makeCSRFHeader().set("Content-Type", "application/json") })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteChat(id: number): Observable<void> {
    const url = `${this.chatUrl}/${id}/`;
    return this.http.delete(url, { headers: this.utils.makeCSRFHeader() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private _oneAuthor$: BehaviorSubject<Author> = new BehaviorSubject(null);  // signals for open chat with author

  set oneAuthor(value: Author) {
    this._oneAuthor$.next(value);
  }

  get oneAuthor$(): Observable<Author> {
    return this._oneAuthor$.asObservable();
  }

  private _newMessages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);  // signals for open chat with author

  set newMessages(value: ChatMessage[]) {
    this._newMessages$.next(value);
  }

  get newMessages$(): Observable<ChatMessage[]> {
    return this._newMessages$.asObservable();
  }

  private _toggleObserver$: BehaviorSubject<string> = new BehaviorSubject(null);  // signals for toggle observer

  set toggleObserver(value: string) {
    this._toggleObserver$.next(value);
  }

  get toggleObserver$(): Observable<string> {
    return this._toggleObserver$.asObservable();
  }

} // end of class
