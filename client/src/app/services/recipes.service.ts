import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/error-handling.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${environment.url}api/recipes`)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http
      .get<Recipe>(`${environment.url}api/recipes/${id}`)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  addRecipe(recipe: Recipe): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('jwt'),
    });

    return this.http
      .post<Recipe>(`${environment.url}api/recipes`, recipe, {
        headers: headers,
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  editRecipe(recipe: Recipe, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('jwt'),
    });
    return this.http
      .put<Recipe>(`${environment.url}api/recipes/${id}`, recipe, {
        headers: headers,
      })
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http
      .delete<Recipe>(`${environment.url}api/recipes/${id}`)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
}
