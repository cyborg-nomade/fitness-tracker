import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string, duration: any) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
