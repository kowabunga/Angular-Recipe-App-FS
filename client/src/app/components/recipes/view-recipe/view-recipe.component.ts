import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../models/Recipe';
import { RecipesService } from '../../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent implements OnInit {
  recipe: Recipe;
  id: string;
  fromUser: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fromUser = history.state.fromUser;

    this.activatedRoute.params.subscribe((data) => {
      this.id = data.id;
    });

    this.recipesService.getRecipeById(this.id).subscribe(
      (data) => {
        this.recipe = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
