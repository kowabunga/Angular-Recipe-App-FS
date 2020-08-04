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
