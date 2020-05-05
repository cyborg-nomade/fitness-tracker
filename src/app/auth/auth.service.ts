import { UIService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import * as fromRoot from '../app.reducer';
import * as UIActions from '../shared/ui.actions';
import * as AuthActions from './auth.actions';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private traningService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.traningService.cancelSubscriptions();
        this.store.dispatch(new AuthActions.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UIActions.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UIActions.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
