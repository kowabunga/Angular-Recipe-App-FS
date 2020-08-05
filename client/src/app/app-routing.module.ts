import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/layout/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ViewRecipeComponent } from './components/recipes/view-recipe/view-recipe.component';
import { AddRecipeFormComponent } from './components/recipes/add-recipe-form/add-recipe-form.component';
import { UserRecipesComponent } from './components/user/recipes/user-recipes.component';
import { EditRecipeComponent } from './components/recipes/edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipe/add', component: AddRecipeFormComponent },
  { path: 'recipe/:id/edit', component: EditRecipeComponent },
  { path: 'recipe/:id', component: ViewRecipeComponent },
  { path: 'user/recipes', component: UserRecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
