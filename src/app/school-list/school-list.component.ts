import { School } from './../../beans/school';
import { DataService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  schools: School[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
