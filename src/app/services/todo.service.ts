import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.models';
import { Todo } from '../models/todo.models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly TodoStorageKey = 'todos';

  private todos! : Todo[];
  private filteredTodos!: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter : Filter = Filter.All;

  todo$: Observable<Todo[]>= this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) { }

  fetchFromLocalStorage(){
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey)||[];
    this.filteredTodos= [...this.todos.map(todo=>({...todo}))];
    console.log(this.todo$);

    this.updateTodosData();
  }

  private updateTodosData(){
    this.displayTodoSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

  updateToLocalStorage(){
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter,false);
    this.updateTodosData();
  }

  filterTodos(filter:Filter, isFiltering:boolean = true){
    //gán filter, luôn update filter
    this.currentFilter= filter;
    //switch qua filter
    switch(filter){
      case Filter.Active:
        this.filteredTodos = this.todos.filter(todo =>!todo.isCompleted);
        break;
        case Filter.Completed:
          this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
          break;
          case Filter.All:
            this.filteredTodos= [...this.todos.map(todo=>({...todo}))];
            break;
    }
    //Do filter
    if(isFiltering){
      this.updateTodosData();
    }
  }
}
