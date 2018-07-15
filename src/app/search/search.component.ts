import { School } from './../models/school';
import { SchoolListComponent } from './../school-list/school-list.component';
import { DataService } from './../services/data-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() schoolListComponent: SchoolListComponent;

  myControl = new FormControl();
  options: String[] = [];
  filteredOptions: Observable<String[]>;

  constructor(
    private dataServiceService: DataService
  ) { }

  ngOnInit() {
    this.dataServiceService.getAllSchools().then((schools: School[]) => {
      this.schoolListComponent.schools = schools.slice(0, 10);
      schools.forEach((school: School) => {
        this.options.push(school.name);
      });
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  search(schoolName: string): void {
    this.dataServiceService.getAllSchools().then((schools: School[]) => {
      if(!schoolName || schoolName.length === 0) {
        this.schoolListComponent.schools = schools.slice(0, 10);
      } else {
        this.schoolListComponent.schools = schools.filter((school: School) => {
          return school.name.toLowerCase() === schoolName.toLowerCase();
        });
      }
    });
    
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
