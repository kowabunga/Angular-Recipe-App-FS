import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SanitizePipe } from './pipes/sanitize.pipe';

import { HomeComponent } from './components/layout/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { AddRecipeFormComponent } from './components/recipes/add-recipe-form/add-recipe-form.component';
import { RecipeStepCardComponent } from './components/recipes/recipe-step-card/recipe-step-card.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ViewRecipeComponent } from './components/recipes/view-recipe/view-recipe.component';
import { StepTimerComponent } from './components/step-timer/step-timer.component';
import { UserRecipesComponent } from './components/user/recipes/user-recipes.component';
import { RecipeCardComponent } from './components/recipes/recipe-card/recipe-card.component';
import { EditRecipeStepCardComponent } from './components/recipes/edit-recipe-step-card/edit-recipe-step-card.component';
import { EditRecipeComponent } from './components/recipes/edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddRecipeFormComponent,
    RecipeStepCardComponent,
    RegisterComponent,
    ViewRecipeComponent,
    StepTimerComponent,
    SanitizePipe,
    UserRecipesComponent,
    RecipeCardComponent,
    EditRecipeStepCardComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
