import { Component, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';

import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  message: any;
  visible: boolean;
  bottom: string;
  snackbarStyles: any;

  private msgSubscription: Subscription;

  constructor(private snackbarService: SnackbarService) {}

  setStyles(): void {
    this.snackbarStyles = {
      'display': this.visible ? 'block' : 'none',
      'bottom' : this.bottom
    }
  }

  show(): void {
    this.visible = true;
    this.bottom = '-60px';
    this.setStyles();
    setTimeout(() => {
      this.bottom = '20px'; this.setStyles();
    });
    setTimeout(() => {
      this.bottom = '-60px'; this.setStyles();
    }, 5000);
    setTimeout(() => {
      this.visible = false; this.setStyles();
    }, 5500);
  }

  ngOnInit(): void {
    this.setStyles();

    setTimeout(() => { // delay to avoid "Expression has changed after it was checked" error
      this.msgSubscription = this.snackbarService.message$
        .subscribe(msg => {
          if (msg) {
            this.message = msg;
            this.snackbarService.message = null; // reset in service
            this.show();
          }
        });
    });
  }

  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
  }
}
