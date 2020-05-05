import { UIService } from './../shared/ui.service';
import { Exercise } from './exercise.model';
import * as fromTraining from './training.reducer';
import * as UIActions from '../shared/ui.actions';
import * as TrainingActions from './training.actions';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UIActions.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as Exercise),
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UIActions.StopLoading());
            this.store.dispatch(
              new TrainingActions.SetAvailableExercises(exercises)
            );
          },
          (error) => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UIActions.StopLoading());
            this.uiService.showSnackBar(
              'Fetching exercises failed. Please, try again later.',
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new TrainingActions.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.addDatatoDatabase({
          ...exercise,
          date: new Date(),
          state: 'complete',
        });
        this.store.dispatch(new TrainingActions.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.addDatatoDatabase({
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
        this.store.dispatch(new TrainingActions.StopTraining());
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(
            new TrainingActions.SetFinishedExercises(exercises)
          );
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }

  private addDatatoDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
