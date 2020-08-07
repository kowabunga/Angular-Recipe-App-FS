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
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedIn = this.isLoggedIn.asObservable();
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  login(email: string, password: string): Observable<any> {
    let user = { email, password };

    return this.http
      .post<any>('http://localhost:8080/api/auth', user, httpOptions)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  logout(): void {
    this.changeLoginStatus(false);
    localStorage.removeItem('jwt');
  }

  register(name: string, email: string, password: string): Observable<any> {
    let user = new User(name, email, password);

    return this.http
      .post<User>('http://localhost:8080/api/users', user, httpOptions)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  changeLoginStatus(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  checkIfLoggedIn(): void {
    if (localStorage.getItem('jwt') !== null) {
      this.changeLoginStatus(true);
    }
  }

  getUserRecipes(): Observable<Recipe[]> {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('jwt'),
    });
    return this.http
      .get<Recipe[]>('http://localhost:8080/api/users/recipes', {
        headers: headers,
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('jwt'),
    });
    return this.http
      .get<User>('http://localhost:8080/api/users', { headers: headers })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
}
