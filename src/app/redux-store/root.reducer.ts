import { AnyAction, combineReducers, Reducer } from "redux";
import { TodoReducer } from "./todo/todo.reducer";



export const rootReducer: Reducer<any, AnyAction> = combineReducers({
    todo: TodoReducer
});
