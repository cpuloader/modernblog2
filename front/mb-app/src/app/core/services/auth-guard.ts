import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { StorageService } from './storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private storage: StorageService,
                private snackbar: SnackbarService) {}

    canActivate() {
        let user = this.storage.get('user');
        if (!user) {
            this.router.navigate(['/']);
            this.snackbar.message = { text: 'You should login' };
            return false;
        }

        return true;
    }
}
