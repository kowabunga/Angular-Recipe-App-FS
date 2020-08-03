import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';

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
      .post<any>(`http://localhost:8080/api/auth`, user)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  logout(): void {
    this.changeLoginStatus(false);
    localStorage.removeItem('jwt');
  }

  changeLoginStatus(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  checkIfLoggedIn(): void {
    if (localStorage.getItem('jwt') !== null) {
      this.changeLoginStatus(true);
    }
  }
}
