import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filter, FilterButton } from 'src/app/models/filtering.models';
import { TodoService } from 'src/app/services/todo.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  filterButtons: FilterButton [] = [
    {type: Filter.All,label:'Tất cả',isActive:true},
    {type: Filter.Active,label:'Hoạt động',isActive:false},
    {type: Filter.Completed,label:'Hoàn thành',isActive:false}
  ]


  length = 0;
  hasComplete$!: Observable<boolean>;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.hasComplete$ = this.todoService.todos$.pipe(
      map(todos => todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$),
    );

    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => {
      this.length = length;
    });
  }

  filter(type: Filter) {
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type);
  }

  private setActiveFilterBtn(type: Filter) {
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    });
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  ngOnDestroy() {
    this.destroy$.next;
    this.destroy$.complete();
  }

}
