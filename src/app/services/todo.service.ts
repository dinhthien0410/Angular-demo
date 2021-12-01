import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly TodoStorageKey = 'todos';

  // private todos: Todo[];
  // private filterTodos: Todo[];
  // private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() { }
}
