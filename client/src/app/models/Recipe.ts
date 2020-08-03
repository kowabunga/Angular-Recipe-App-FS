import { RecipeStep } from './RecipeStep';
export class Recipe {
  recipeTitle: string;
  recipeDescription: string;
  recipeImage: string;
  ingredients: string;
  recipeSteps: RecipeStep[];
  _id?: string; //optional because it is not created here - it is created in mongodb but used in the app later

  // constructor(recipe) {
  //   this.recipeTitle = recipe.recipeTitle;
  //   this.recipeDescription = recipe.recipeDescription;
  //   this.recipeImage = recipe.recipeImage;
  //   this.ingredients = recipe.ingredients;
  //   this.recipeSteps = recipe.recipeSteps;
  // }
}
