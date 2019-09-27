import { Component } from "@angular/core";
import { Router }    from '@angular/router';

import { Author } from '../json-objects';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage {
  user: Author = new Author();
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  onSubmit(): void {
    this.doLogin();
  }

  doLogin(): void {
    this.authService.login(this.user.email, this.user.password)
      .subscribe(
          user => {
            this.user = user;
            this.authService.setMeToStorage(user);
            this.router.navigateByUrl('/');
          },
          err => {
            if (err.error.hasOwnProperty('detail')) {
              this.error = err.error.detail;
            } else {
              this.error = 'error';
            }
          }
      );
  }

  goToRemindPasswordPage(): void {
    this.router.navigateByUrl('/remind-password');
  }

}
