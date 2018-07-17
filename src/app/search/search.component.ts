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
import * as lodash from 'lodash';  

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
  
  successFunction(position) {
    lodash.chain(this.schools).sortBy('schoolName').map(function(school) {
      if(this.isNearestSkool(position, school) > 10) {
      }
    }).value();

  }
  
  isNearestSkool(position, option) {
    let currentLat = position.coords.latitude;
    let currentLng = position.coords.longitude;

    let R = 6371; // Radius of the earth
    
    let latDistance = this.toRadians(currentLat - 10.068331);
   
    let lonDistance = this.toRadians(76.373784 - 76.383268);
   
    let a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(this.toRadians(10.068331))
   
               * Math.cos(this.toRadians(10.066091)) * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
   
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   
    let distance = R * c * 1000; // convert to meters
   
    distance = Math.pow(distance, 2) + Math.pow(0, 2);
   
    distance = Math.sqrt(distance);
   
    let distanceinnm = distance * 0.00054; // Meter to Nauticalmile
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  errorFunction(){
      alert("Geocoder failed");
  }

  searchNearestSkools(): void {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.successFunction, this.errorFunction);
        } else {
          this.schoolService.getAll().subscribe(schools => this.schools = schools);
        }		
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
