import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe;
  id: string;
  constructor(
    private recipeService: RecipesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((data) => (this.id = data.id));
    this.recipeService.getRecipeById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.recipe = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
