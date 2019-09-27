import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { WindowRef } from './window';

var DEBUG: boolean;

if (environment.production) {
    DEBUG = false;
} else { DEBUG = true; }

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    constructor(private windowRef: WindowRef) {}

    debug: boolean = DEBUG;
    host: string = '127.0.0.1:8000';
    static: string = '/static/';

    public getHost(): string {
        return this.debug ? this.host : this.windowRef.nativeWindow.location.host;
    }

    public getApiUrl(): string {
        return this.windowRef.nativeWindow.location.protocol + '//' + this.getHost() + '/api/v1';
    }

    public profilePlaceholder(): any {
        return { 'backgroundImage' : 'url(' + this.windowRef.nativeWindow.location.protocol + '//' + this.getHost() + this.static +
               'placeholders/avatar/default_avatar.jpg' + ')' };
    }

    public postAvatarPlaceholder(): any {
        return { 'backgroundImage' : 'url(' + this.windowRef.nativeWindow.location.protocol + '//' + this.getHost() + this.static +
               'placeholders/avatar/default_post.jpg' + ')' };
    }

    public commentAvatarPlaceholder(): any {
        return { 'backgroundImage' : 'url(' + this.windowRef.nativeWindow.location.protocol + '//' + this.getHost() + this.static +
               'placeholders/avatar/default_comment.jpg' + ')' };
    }
}
