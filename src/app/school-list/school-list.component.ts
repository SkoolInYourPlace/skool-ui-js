import { School } from './../models/school';
import { Data } from './../providers/provider-data';
import { DataService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  schools: School[] = [];

  constructor(private router: Router, private data: Data) {
  }

  ngOnInit() {
  }

  gotoDetail(school: School) {
    this.data.storage = school;
    this.router.navigate(['/details']);
  }
}
