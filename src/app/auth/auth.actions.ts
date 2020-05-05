import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] SET_AUTHENTICATED';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;

  constructor(public payload?: any) {}
}

export const SET_UNAUTHENTICATED = '[Auth] SET_UNAUTHENTICATED';

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;

  constructor(public payload?: any) {}
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
