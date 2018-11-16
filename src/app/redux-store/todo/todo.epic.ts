import { TodoActions, TodoAction } from './todo.actions';
import { Injectable } from "@angular/core";
import { TodoService } from './todo.service';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, catchError, startWith, map, withLatestFrom, switchMap, tap, merge } from 'rxjs/operators';
import { of } from 'rxjs';



// EPICS HAVE TO RETURN AN OBSERVABLE OR AT LEAST SOMETHING
// OTHERWISE IT GETS STUCK IN AN ENDLESS LOOP AND TELLS YOU NOTHING IS WRONG

@Injectable()
export class TodoEpics {
    constructor(
        private actions: TodoActions,
        private service: TodoService
    ) {}

    getTodoEpics() {
        return combineEpics(
            this.LoadEpic,
            this.CreateEpic,
            this.DeleteEpic
        );
    }

    LoadEpic = (action$, state$) => action$.pipe(
        // ofType a cleaner way of filtering out incoming Actions
        ofType(TodoActions.LOAD_TODOS),
        mergeMap((action: TodoAction) => {
            return this.service.get().pipe(
                map( data => this.actions.loadSucceeded(data)),
                catchError(error => {
                    console.log(error);
                    return of(this.actions.loadFailed(error));
                }),
                startWith(this.actions.loadStarted())
            );
        })
    )

    CreateEpic = (action$, state$) => action$.pipe(
        ofType(TodoActions.CREATE_TODO),
        // This screwed me up a bit. So, basically if you want to include state within the
        // Epic uncomment out below. However the action in mergeMap will become an array
        // [0] being the actual action and [1] being the state
        // withLatestFrom(state$),
        mergeMap((action: TodoAction) => {
            return this.service.post(action.payload).pipe(
                map( data => this.actions.createSucceeded(data)),
                catchError(error => {
                    return of(this.actions.createFailed(error));
                }),
                startWith(this.actions.createStarted())
            );
        }),
        catchError(error => {
            console.log(error);
            return of(this.actions.createFailed(error));
        })
    )

    DeleteEpic = (action$, state$) => action$.pipe(
        ofType(TodoActions.DELETE_TODO),
        mergeMap((action: TodoAction) => {
            return this.service.delete(action.payload).pipe(
                map(() => this.actions.deleteSucceeded(action.payload)),
                catchError(error => {
                    return of(this.actions.deleteFailed(error));
                }),
                startWith(this.actions.deleteStarted())
            );
        })
    )
}
