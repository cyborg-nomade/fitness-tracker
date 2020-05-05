import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }
}
