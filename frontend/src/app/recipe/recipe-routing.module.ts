import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeResolver } from './recipe-resolver';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  { path: 'list', component: RecipeListComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ RecipeResolver ]
})
export class RecipeRoutingModule { }
