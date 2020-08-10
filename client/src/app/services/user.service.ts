import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  getUserRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('jwt'),
    });
    return this.http
      .get<Recipe[]>('api/users/recipes', {
        headers: headers,
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('jwt'),
    });
    return this.http
      .get<User>('api/users', { headers: headers })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  updateUser(updatedUser: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('jwt'),
    });
    return this.http
      .put<any>(`api/users`, updatedUser, {
        headers: headers,
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
}
