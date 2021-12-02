import { Component, Input, OnInit } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.models';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  todoContent!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onTodoContentChanged(value:string){
    console.log({value});
  }
}
