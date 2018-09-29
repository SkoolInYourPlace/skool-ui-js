import { Component, OnInit } from '@angular/core';
import { Data } from './../providers/provider-data';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {
  school = {};
  constructor(private data: Data) { 
    console.log(JSON.stringify(this.data.storage));
    this.school = data;
  }

  ngOnInit() {
  }

}
