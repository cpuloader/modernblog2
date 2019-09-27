import { Component, OnInit } from "@angular/core";

import { Author } from '../json-objects';

import { AuthService } from '../core/services/auth.service';
import { ProfileService } from '../core/services/profile.service';
import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'profile-set-form',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})

export class SettingsPage implements OnInit {
  profile: Author = new Author();
  errors: any;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  onSubmit(): void { this.doUpdate(); }

  doUpdate(): void {
    this.errors = undefined;
    if (this.profile.password !== this.profile.confirm_password) {
      this.errors = { 'confirm_password': ['Password and confirm password must be equal'] };
      return;
    }
    this.profileService.update(this.profile)
      .subscribe(
        author => {
          this.profile = author;
          //console.log(this.profile);
          this.snackbarService.message = { text: "Profile updated!" };
          this.authService.setMeToStorage(this.profile);
        },
        err => {
          this.errors = err.error;
          if (err.error.details) {
            this.errors.otherError = err.error.details;
          }
        });
  }

  doDelete(): void {
    let ask = confirm('Do you want to delete this account?');
    if (!ask) { return;}
    this.profileService.destroy(this.profile.id)
      .subscribe(() => {
        this.authService.logout();
        this.snackbarService.message = { text: "Account deleted!" };
      }, err => {
        if (err.error && err.error.details) {
          this.errors = err.error.details;
        } else {
          this.errors = err;
        }
      });
  }

  ngOnInit(): void {
    this.profile = this.authService.getMeFromStorage();
  }
}
