import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { User } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  requestResetPasswordLink(email: string): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:8080/api/auth/reset`,
        {
          email: email,
        },
        httpOptions
      )
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  resetPassword(password: string, token: string): Observable<any> {
    return this.http
      .patch<any>(
        `http://localhost:8080/api/auth/reset/${token}`,
        { password: password },
        httpOptions
      )
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
}
