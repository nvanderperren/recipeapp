import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeFilterPipe } from './recipe-filter.pipe';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDataService } from './recipe-data.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'recipe-list', component: RecipeListComponent },
  { path: 'add-recipe', component: AddRecipeComponent }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    RecipeComponent,
    IngredientComponent,
    AddRecipeComponent,
    RecipeFilterPipe,
    RecipeListComponent
  ],
  providers: [ RecipeDataService ]
})
export class RecipeModule { }
