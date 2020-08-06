import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeStep } from 'src/app/models/RecipeStep';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  id: string;
  ingredients: string;
  recipeTitle: string;
  recipeDescription: string;
  recipeImage: string;
  recipeSteps: RecipeStep[];
  counter = 0;

  constructor(
    private recipeService: RecipesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((data) => (this.id = data.id));
    this.recipeService.getRecipeById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.ingredients = data.ingredients;
        this.recipeTitle = data.recipeTitle;
        this.recipeDescription = data.recipeDescription;
        this.recipeImage = data.recipeImage;
        this.recipeSteps = data.recipeSteps;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  next(): void {
    if (this.counter < this.recipeSteps.length) this.counter++;
  }
  prev(): void {
    if (this.counter >= 0) this.counter--;
  }

  submitEdit(): void {}
}
