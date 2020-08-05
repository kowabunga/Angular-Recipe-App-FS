import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() isOwner: boolean;
  @Output() deletedId: EventEmitter<string> = new EventEmitter();

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {}

  // Delete recipe and emit id so user recipe component can catch id and delete from list
  deleteRecipe(id: string): void {
    this.recipeService.deleteRecipe(id).subscribe(
      (data) => {
        console.log(data.msg);
        this.deletedId.emit(id);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
