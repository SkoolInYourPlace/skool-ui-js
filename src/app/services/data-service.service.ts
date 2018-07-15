import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { School } from '../../beans/school';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private resolve: (schools: School[]) => void;
  private reject: (error: Error) => void;
  private schoolDataProvider: Promise<School[]>;

  constructor(private http: HttpClient) {
    console.log('get all schools');
    this.schoolDataProvider = new Promise<School[]>((resFn, rejFn) => {
      this.resolve = resFn;
      this.reject = rejFn;
    });
    this.http
      .get<School[]>('http://localhost:8080/schools/school')
      .pipe(catchError(this.handleError))
      .subscribe((schools: School[]) => {
        this.resolve(schools);
      });
  }

  public getAllSchools(): Promise<School[]> {
    return this.schoolDataProvider;
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);

    this.reject(new Error(res.error));
    return observableThrowError(res.error || 'Server error');
  }
}
