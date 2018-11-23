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
        private readonly _appUrl = '/API';

    constructor(private http: HttpClient) {}

    get recipes(): Observable<Recipe[]> {
        return this.http.get(`${this._appUrl}/recipes/`)
            .pipe(
                map((list: any[]): Recipe[] =>
                    list.map(Recipe.fromJSON))
            );
    }

    addNewRecipe(newRecipe): Observable<Recipe> {
        return this.http
            .post(`${this._appUrl}/recipes/`, newRecipe)
            .pipe(
                map(Recipe.fromJSON)
            );
    }

        removeRecipe(recipe) {
            return this.http
                .delete(`${this._appUrl}/recipe/${recipe.id}`)
                .pipe(map(Recipe.fromJSON));
    }
}
