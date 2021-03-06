import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] START_LOADING';

export class StartLoading implements Action {
  readonly type = START_LOADING;

  constructor() {}
}

export const STOP_LOADING = '[UI] STOP_LOADING';

export class StopLoading implements Action {
  readonly type = STOP_LOADING;

  constructor() {}
}

export type UIActions = StartLoading | StopLoading;
