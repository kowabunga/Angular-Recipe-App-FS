import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() isOwner: boolean;
  @Output() deletedId: EventEmitter<string> = new EventEmitter();

  constructor(private recipeService: RecipesService, private route: Router) {}

  ngOnInit(): void {}

  routeTo() {
    if (this.isOwner) {
      this.route.navigate([`/recipe/${this.recipe._id}`], {
        state: { fromUser: this.isOwner },
      });
    } else {
      this.route.navigate([`/recipe/${this.recipe._id}`]);
    }
  }

  // Delete recipe and emit id so user recipe component can catch id and delete from list
  deleteRecipe(id: string): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(
        (data) => {
          this.deletedId.emit(id);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
