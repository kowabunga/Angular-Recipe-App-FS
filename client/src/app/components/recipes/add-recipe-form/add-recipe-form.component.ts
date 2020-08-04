import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { RecipeStep } from '../../../models/RecipeStep';
import { RecipesService } from '../../../services/recipes.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Recipe } from 'src/app/models/Recipe';

// @TODO make into own component

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss'],
})
export class AddRecipeFormComponent implements OnInit, OnDestroy {
  // Add viewChild on form to reset it
  @ViewChild('addForm') form;

  recipeAdd: any;

  firstSubmit: boolean = true;
  count = 0;
  recipeTitle: string;
  recipeDescription: string;
  recipeImage: string;
  ingredients: string;
  recipe: Recipe = {
    recipeTitle: '',
    recipeDescription: '',
    recipeImage: '',
    ingredients: '',
    recipeSteps: null,
  };
  recipeSteps: RecipeStep[] = [];
  recipeStep: RecipeStep = {
    title: '',
    directions: this.count === 1 ? 'You will need these ingredients' : '',
    media: '',
    mediaType: '',
    timer: '',
    optional: '',
  };

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private recipeService: RecipesService,
    private snackBar: MatSnackBar,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.recipeAdd.unsubscribe();
  }

  addStep({ value, valid }: { value: any; valid: boolean }): void {
    // if submission is valid and not the first submission, push title, directions, and the image array (if provided) and push to recStep. Then push recipe step to greater recipe

    const recStep = {};
    if (valid && !this.firstSubmit) {
      recStep['title'] = value.title;
      recStep['directions'] = value.directions;
      value.media !== '' && (recStep['media'] = value.media);
      value.mediaType !== '' && (recStep['mediaType'] = value.mediaType);
      value.timer !== '' && (recStep['timer'] = value.timer);
      value.optional !== '' && (recStep['optional'] = value.optional);

      // ingredients will only be pushed to overall recipe object if count === 1
      this.count === 1 && (this.recipe.ingredients = value.ingredients);

      this.count++;
      this.showSnackbar('Step added to recipe.');

      value.title &&
        value.directions &&
        this.recipeSteps.push(new RecipeStep(recStep));
    }

    // if valid and is the first submission, push title, directions, and id to recipe array
    if (valid && this.firstSubmit) {
      this.firstSubmit = !this.firstSubmit;
      this.recipe.recipeTitle = value.title;
      this.recipe.recipeDescription = value.directions;
      this.recipe.recipeImage = value.media;
      this.count++;
      this.showSnackbar('Recipe title and description added');
    }

    // Since this form is reused to submit each recipe step, this logic will reset the focus to be the first input element of the form, identified by the class "first-input"
    this.elRef.nativeElement.querySelector('.first-input').focus();

    // reset form (from viewchild)
    value.title && value.directions && this.form.resetForm();

    // If add ingredients step, pre-fill title/description inputs of form
    if (this.count === 1) {
      this.recipeStep.title = 'Ingredients';
      this.recipeStep.directions = 'Gather the ingredients';
    }

    // ensure recipeStep.media is reset for ngIf in radio button group
    this.recipeStep.media = '';
  }

  addRecipe(): void {
    this.recipe.recipeSteps = this.recipeSteps;
    this.recipeAdd = this.recipeService.addRecipe(this.recipe).subscribe(
      (data) => console.log(data),
      (error) => {
        console.log(error);
      }
    );
  }

  showSnackbar(msg: string): void {
    let snackBarRef = this.snackBar.open(msg, null, {
      duration: 3000,
      verticalPosition: this.verticalPosition,
      panelClass: ['on-top-with-color'],
    });
  }
}
