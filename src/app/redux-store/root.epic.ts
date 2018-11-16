import { TodoEpics } from './todo/todo.epic';
import { Injectable } from "@angular/core";
import { combineEpics } from 'redux-observable';


@Injectable()
export class RootEpics {
    constructor(
        private todoEpics: TodoEpics
    ) {}

    public createEpics() {
        return combineEpics(
            this.todoEpics.getTodoEpics()
            );
    }
}
