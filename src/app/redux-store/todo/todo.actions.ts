import { TodoAction } from './todo.actions';
import { FluxStandardAction, ErrorFluxStandardAction } from 'flux-standard-action';
import { ITodo } from './todo.model';
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

export type TodoAction = FluxStandardAction<any, any>;

@Injectable()
export class TodoActions {

    static readonly LOAD_TODOS = 'LOAD_TODOS';
    static readonly LOAD_TODOS_STARTED = 'LOAD_TODOS_STARTED';
    static readonly LOAD_TODOS_SUCCEEDED = 'LOAD_TODOS_SUCCEEDED';
    static readonly LOAD_TODOS_FAILED = 'LOAD_TODOS_FAILED';

    static readonly CREATE_TODO = 'CREATE_TODO';
    static readonly CREATE_TODOS_STARTED = 'CREATE_TODO_STARTED';
    static readonly CREATE_TODOS_SUCCEEDED = 'CREATE_TODO_SUCCEEDED';
    static readonly CREATE_TODOS_FAILED = 'CREATE_TODO_FAILED';

    static readonly DELETE_TODO = 'DELETED_TODO';
    static readonly DELETE_TODO_STARTED = 'DELETE_TODO_STARTED';
    static readonly DELETE_TODO_SUCCEEDED  = 'DELETE_TODO_SUCCEEDED';
    static readonly DELETE_TODO_FAILED = 'DELETE_TODO_FAILED';



    static readonly UPDATED_TODOS = 'UPDATED_TODOS';

    // All theses actions are for GET
    @dispatch()
    load = (): TodoAction => ({
        type: TodoActions.LOAD_TODOS,
        payload: null
    })

    loadStarted = (): TodoAction => ({
        type: TodoActions.LOAD_TODOS_STARTED,
        payload: null
    })

    loadSucceeded = (payload: ITodo[]): TodoAction => ({
        type: TodoActions.LOAD_TODOS_SUCCEEDED,
        payload
    })

    loadFailed = (error: Error): TodoAction => ({
        type: TodoActions.LOAD_TODOS_FAILED,
        payload: error,
        error: true
    })

    // All these actions are for POST
    @dispatch()
    create = (payload: ITodo) => ({
        type: TodoActions.CREATE_TODO,
        payload
    })

    createStarted = (): TodoAction => ({
        type: TodoActions.CREATE_TODOS_STARTED,
        payload: null
    })

    createSucceeded = (payload: ITodo): TodoAction => ({
        type: TodoActions.CREATE_TODOS_SUCCEEDED,
        payload
    })
    createFailed = (error: Error): TodoAction => ({
        type: TodoActions.CREATE_TODOS_FAILED,
        payload: error,
        error: true
    })

    @dispatch()
    delete = (payload: number) => ({
        type: TodoActions.DELETE_TODO,
        payload
    })

   deleteStarted = (): TodoAction => ({
        type: TodoActions.DELETE_TODO_STARTED,
        payload: null
    })

   deleteSucceeded = (payload: number): TodoAction => ({
        type: TodoActions.DELETE_TODO_SUCCEEDED,
        payload
    })
   deleteFailed = (error: Error): TodoAction => ({
        type: TodoActions.DELETE_TODO_FAILED,
        payload: error,
        error: true
    })
}


