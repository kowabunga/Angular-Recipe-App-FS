import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/error-handling.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('jwt'),
  }),
};

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
      .get<Recipe[]>('http://localhost:8080/api/recipes')
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http
      .get<Recipe>(`http://localhost:8080/api/recipes/${id}`)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }

  addRecipe(recipe: Recipe): Observable<any> {
    return this.http
      .post<any>('http://localhost:8080/api/recipes', recipe, httpOptions)
      .pipe(catchError(this.errorHandler.handleHttpError));
  }
}
