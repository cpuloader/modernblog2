import { Component } from "@angular/core";
import { Location }  from '@angular/common';

import { AuthService } from '../core/services/auth.service';
import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'remind-pass-form',
  templateUrl: './remind-password.page.html'
})

export class RemindPasswordPage {
  username: string = '';
  error: string = '';
  sent: boolean = true;
  success: boolean;

  constructor(private authService: AuthService,
              private snackbarService: SnackbarService,
              private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.sent = false;
    this.success = false;
    this.error = '';
    this.authService.remindPwd(this.username).subscribe(
      () => {
        this.snackbarService.message = { text: 'New password was sent to your email.' };
        this.sent = true;
        this.success = true;
      },
      err => {
        this.sent = true;
        this.error = err.error;
      }
    );
  }

}
