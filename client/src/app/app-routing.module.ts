import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/layout/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ViewRecipeComponent } from './components/recipes/view-recipe/view-recipe.component';
import { AddRecipeFormComponent } from './components/recipes/add-recipe-form/add-recipe-form.component';
import { EditRecipeComponent } from './components/recipes/edit-recipe/edit-recipe.component';
import { UserComponent } from './components/user/user/user.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'recipe/add',
    canActivate: [AuthGuard],
    component: AddRecipeFormComponent,
  },
  {
    path: 'recipe/:id/edit',
    canActivate: [AuthGuard],
    component: EditRecipeComponent,
  },
  { path: 'recipe/:id', component: ViewRecipeComponent },
  { path: 'user/account', canActivate: [AuthGuard], component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
