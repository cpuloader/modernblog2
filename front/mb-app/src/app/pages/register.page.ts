import { Component } from "@angular/core";
import { Router }    from '@angular/router';

import { Author } from '../json-objects';

import { AuthService } from '../core/services/auth.service';
import { WindowRef }   from '../core/services/window';
import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'register-form',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})

export class RegisterPage {
  user: Author = new Author();
  errors: any;

  constructor(private authService: AuthService,
              private router: Router,
              private snackbarService: SnackbarService) {}

  onSubmit(): void {
    this.errors = undefined;
    this.authService.register(this.user.email, this.user.username, this.user.password)
      .subscribe(
        user => {
          this.user = user;
          this.snackbarService.message = { text: "User registered! You can login now." };
          this.router.navigateByUrl('/');
        },
        err => {
          this.errors = err.error;
          if (err.error.hasOwnProperty('details')) {
            this.errors.otherError = err.error.details;
          }
        }
      );
  }
}
