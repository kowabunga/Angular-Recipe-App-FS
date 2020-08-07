import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { RecipesService } from '../../../services/recipes.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  loggedIn: boolean = false;
  observerArr: any = [];

  constructor(
    private recipeService: RecipesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.observerArr.push(
      this.authService.loggedIn.subscribe((data) => (this.loggedIn = data))
    );

    this.observerArr.push(
      this.recipeService.getRecipes().subscribe((recipes) => {
        this.recipes = recipes;
      })
    );
  }

  ngOnDestroy(): void {
    this.observerArr.forEach((item) => item.unsubscribe());
  }
}
