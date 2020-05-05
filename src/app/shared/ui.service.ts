import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string, duration: any) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
