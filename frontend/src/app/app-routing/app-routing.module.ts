import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from '../recipe/recipe-list/recipe-list.component';
import { AddRecipeComponent } from '../recipe/add-recipe/add-recipe.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipe-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: true})],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
