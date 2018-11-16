import { catchError } from 'rxjs/operators';
import { ITodo } from './todo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {

  private readonly url = 'http://localhost:3000/todos';

  constructor(private httpClient: HttpClient) { }

  get = (): Observable<ITodo[]> => {
    return this.httpClient.get<ITodo[]>(this.url);
  }

  post = (todo: ITodo): Observable<ITodo>  => {
    return this.httpClient.post<ITodo>(this.url, todo);
  }

  delete = (id: number): Observable<{}> => {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
