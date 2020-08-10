import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  id: string;

  counter = 0;
  recipe: Recipe;
  constructor(
    private recipeService: RecipesService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((data) => (this.id = data.id));
    this.recipeService.getRecipeById(this.id).subscribe(
      (data) => {
        this.recipe = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  next(): void {
    if (this.counter < this.recipe.recipeSteps.length) this.counter++;
  }
  prev(): void {
    if (this.counter >= 0) this.counter--;
  }

  submitEdit(): void {
    console.log(this.recipe);
    this.recipeService.editRecipe(this.recipe, this.id).subscribe(
      (data) => {
        if (data.success) {
          this.route.navigate(['/user/account']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
