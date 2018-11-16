import { ITodo } from './redux-store/todo/todo.model';
import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { TodoActions } from './redux-store/todo/todo.actions';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public todo: ITodo = {};

  @select('todo')
  public todos: Observable<ITodo[]>;

  constructor(
    // private ngRedux: NgRedux<{}>,
    private actions: TodoActions
  ) {
    this.actions.load();
  }

  addTodo() {
    this.todo.status = false;
    this.actions.create(this.todo);
  }

  deleteTodo(id: number) {
    console.log(id);
    this.actions.delete(id);
  }
}
