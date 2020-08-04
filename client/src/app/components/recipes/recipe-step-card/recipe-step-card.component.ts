import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { RecipeStep } from 'src/app/models/RecipeStep';

@Component({
  selector: 'app-recipe-step-card',
  templateUrl: './recipe-step-card.component.html',
  styleUrls: ['./recipe-step-card.component.scss'],
})
export class RecipeStepCardComponent implements OnInit {
  @Input() recipe: Recipe;
  recipeSteps: RecipeStep[];
  ingredients: string[];
  validVideoWebsite: boolean = false;

  // Current tab is bound to the selectedIndex property of the mat-tab-group. Changes in this value will reflect on the opened tab in the browser.
  currentTab: number = 0;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeSteps = this.recipe.recipeSteps;

    this.displayRecipeCards();
  }

  displayRecipeCards(): void {
    this.ingredients = this.recipe.ingredients
      .split(',')
      .filter((ingredient) => ingredient !== '' && ingredient !== ' ')
      .map((ingredient) => ingredient.trim());

    this.recipeSteps.forEach((card) => {
      card.media = this.editVideoLink(card.media);
    });
  }

  editVideoLink(link: string): string {
    // Link will be undefined on ingredients step - no picture is stored in that object in db
    if (link !== undefined) {
      // perform string manipulation based on whether string is link to vimeo or youtube video
      if (link.includes('vimeo')) {
        const split = link.split('/');

        link = `https://player.vimeo.com/video/${split[split.length - 1]}`;
        this.validVideoWebsite = true;
      }

      if (link.includes('youtube')) {
        link = link.replace('watch?v=', 'embed/');
        this.validVideoWebsite = true;
      }

      return link;
    }
  }

  // So long as currentTab is not 0 (first tab in recipe steps), decrease current tab value to the previous tab
  prevStep(): void {
    if (this.currentTab !== 0) {
      this.currentTab--;
    }
  }

  // So long as currentTab is not equal to this.recipeSteps.length - 1 (last tab in zero-indexed trabs), increase current tab value to the next tab
  nextStep(): void {
    if (this.currentTab !== this.recipe.recipeSteps.length - 1) {
      this.currentTab++;
    }
  }
}
