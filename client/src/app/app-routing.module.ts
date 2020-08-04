import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/layout/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ViewRecipeComponent } from './components/recipes/view-recipe/view-recipe.component';
import { AddRecipeFormComponent } from './components/recipes/add-recipe-form/add-recipe-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipe/add', component: AddRecipeFormComponent },
  { path: 'recipe/:id', component: ViewRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
