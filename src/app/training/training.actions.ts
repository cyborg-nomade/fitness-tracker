import { Exercise } from './exercise.model';

import { Action } from '@ngrx/store';

export const SET_AVAILABLE_EXERCISES = '[Training] SET_AVAILABLE_EXERCISES';

export class SetAvailableExercises implements Action {
  readonly type = SET_AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export const SET_FINISHED_EXERCISES = '[Training] SET_FINISHED_EXERCISES';

export class SetFinishedExercises implements Action {
  readonly type = SET_FINISHED_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export const START_TRAINING = '[Training] START_TRAINING';

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: Exercise) {}
}

export const STOP_TRAINING = '[Training] STOP_TRAINING';

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;

  constructor() {}
}

export type TrainingActions =
  | SetAvailableExercises
  | SetFinishedExercises
  | StartTraining
  | StopTraining;
