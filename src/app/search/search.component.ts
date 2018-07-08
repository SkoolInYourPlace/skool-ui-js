import { Component, OnInit } from '@angular/core';
import { SchoolServiceService } from './../services/school-service.service';
import { FormControl } from '@angular/forms';
import { School } from '../../beans/school';
// import { Router } from '@angular/router';
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
  myControl = new FormControl();
  schools: School[] = [];
  options: String[] = [];
  filteredOptions: Observable<String[]>;

  constructor(
    private schoolService: SchoolServiceService
  ) { }

  ngOnInit() {
    this.schoolService.getAll().subscribe((schools: School[]) => {
      schools.forEach((school: School) => {
        this.options.push(school.schoolName);
      });
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  search(term: string): void {
    this.schoolService.getAll().subscribe(schools => this.schools = schools);
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
