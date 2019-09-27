import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() {}

  private _msg$: BehaviorSubject<any> = new BehaviorSubject(null);

  set message(msg: any) {
    this._msg$.next(msg);
  }

  get message$(): Observable<any> {
    return this._msg$.asObservable();
  }
}
