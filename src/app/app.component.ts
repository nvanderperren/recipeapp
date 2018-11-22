import { Component } from '@angular/core';
import { Recipe } from './recipe/recipe.model';
import { RecipeDataService } from './recipe-data.service';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeDataService]
})
export class AppComponent {

  private _recipes: Recipe[];
  public filterRecipeName: string;
  public filterRecipe$ = new Subject<string>();

  constructor(private _recipeDataService: RecipeDataService) {
    this._recipes = this._recipeDataService.recipes;
    this.filterRecipe$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())

      )
      .subscribe(
      val => this.filterRecipeName = val
    );
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
