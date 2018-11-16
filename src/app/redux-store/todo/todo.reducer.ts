import { ITodo } from './todo.model';
import { TodoAction, TodoActions } from './todo.actions';
import * as Immutable from 'seamless-immutable';
import { Action } from 'redux';

const INITIAL_STATE = Immutable([]);

export function TodoReducer(
    state = INITIAL_STATE,
    action: Action
) {
    const todoAction = action as TodoAction;
    switch (todoAction.type) {
        case TodoActions.LOAD_TODOS_SUCCEEDED: {
            return state.concat(todoAction.payload);
        }
        case TodoActions.CREATE_TODOS_SUCCEEDED: {
            return state.concat(todoAction.payload);
        }
        case TodoActions.DELETE_TODO_SUCCEEDED: {
            return state.filter( (todo: ITodo) => todo.id !== (todoAction.payload));
        }
        default: {
            return state;
        }
    }
}
