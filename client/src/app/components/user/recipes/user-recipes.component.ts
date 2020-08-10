import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss'],
})
export class UserRecipesComponent implements OnInit {
  recipes: Recipe[];
  @Output() hasRecipes: EventEmitter<boolean> = new EventEmitter();
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserRecipes().subscribe(
      (data) => {
        this.recipes = data;
        if (this.recipes.length > 0) {
          this.hasRecipes.emit(true);
        } else {
          this.hasRecipes.emit(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // On delete, filter deleted recipe from list
  onDelete(id): void {
    this.recipes = this.recipes.filter((recipe) => recipe._id !== id);
    if (this.recipes.length === 0) {
      this.hasRecipes.emit(false);
    }
  }
}
