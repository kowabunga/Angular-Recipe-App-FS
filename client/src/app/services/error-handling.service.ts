import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  handleHttpError(error: any) {
    return throwError(error || 'Server Error');
  }
}
