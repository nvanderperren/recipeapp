import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe/recipe.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
    private _recipes = new Array<Recipe>();
    private readonly _appUrl = '/API/recipes/';

  constructor(private http: HttpClient) {
    const recipe1 = new Recipe('spaghetti');
    recipe1.addIngredient('minced meat', 500, 'grams');
    recipe1.addIngredient('tomato', 0.75, 'liter');
    recipe1.addIngredient('onion', 2);
     const recipe2 = new Recipe('risotto');
    recipe2.addIngredient('rice', 200, 'grams');
    recipe2.addIngredient('parmesan', 50, 'grams');
     this._recipes.push(recipe1);
    this._recipes.push(recipe2);
  }

  get recipes(): Observable<Recipe[]> {
      return this.http.get(this._appUrl)
          .pipe(
              map((list: any[]): Recipe[] =>
                  list.map(item =>
                      new Recipe(item.name, item.ingredients, item.created)))
          );
  }

  addNewRecipe(newRecipe): Observable<Recipe> {
      return this.http
          .post(this._appUrl, newRecipe)
          .pipe(
              map(
                  (item: any): Recipe =>
                      new Recipe(item.name, item.ingredients, item.created)
              )
          );
  }
}
