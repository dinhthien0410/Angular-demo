import { Component, OnInit } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.models';

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

  constructor() { }

  ngOnInit(): void {
  }

}
