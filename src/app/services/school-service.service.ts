import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { School } from '../../beans/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<School[]> {
      console.log('get all schools');
    return this.http
      .get<School[]>('http://localhost:8080/schools/school')
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return observableThrowError(res.error || 'Server error');
  }
}
