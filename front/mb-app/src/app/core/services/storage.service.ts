import { Injectable } from '@angular/core';
import { WindowRef } from './window';
import { Author } from '../../json-objects';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  supported: boolean = false;
  storage: any;

  constructor(private winRef: WindowRef) {
    try {
      this.supported = !!winRef.nativeWindow.localStorage;
    }
    catch (error) {
      this.supported = false;
    }

    if (this.supported) {
      try {
          winRef.nativeWindow.localStorage.setItem('test', '1');
      }
      catch (error) {
          this.supported = false;
      }
    }
    if (this.supported) this.storage = winRef.nativeWindow.localStorage;
  }

  set(name: string, data: any) {
    if (!this.supported) return;
    this.storage.setItem(name, JSON.stringify(data));
  }

  get(name: string): any {
    let data;
    if (!this.supported) return;
    data = this.storage.getItem(name);

    if (!data) return;
    if (typeof data === 'undefined') data = null;
    if (data === 'undefined') data = null;

    return JSON.parse(data);
  }

  remove(name: string) {
    if (!this.supported) return;
    this.storage.removeItem(name);
  }

  clear() {
    if (!this.supported) return;
    this.storage.clear();
  }
}
