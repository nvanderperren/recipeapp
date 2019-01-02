import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe/recipe.model';
import { Observable } from 'rxjs';
import { RecipeDataService } from './recipe-data.service';
@Injectable()
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private _recipeService: RecipeDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> {
    return this._recipeService.getRecipe(route.params['id']);
  }
}
