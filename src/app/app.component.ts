import { Component } from '@angular/core';
import { Recipe } from './recipe/recipe.model';
import { RecipeDataService } from './recipe-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeDataService]
})
export class AppComponent {

  private _recipes: Recipe[];
  public filterRecipeName: string;

  constructor(private _recipeDataService: RecipeDataService) {
    this._recipes = this._recipeDataService.recipes;
  }

  get recipes() {
    return this._recipes;
  }

  newRecipeAdded(recipe) {
    this._recipeDataService.addNewRecipe(recipe);
  }

  applyFilter(filter: string) {
    this.filterRecipeName = filter;
  }

}
