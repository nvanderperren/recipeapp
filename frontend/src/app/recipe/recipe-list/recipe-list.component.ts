import { Component, OnInit } from '@angular/core';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from '../recipe/recipe.model';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    private _recipes: Recipe[];
    public filterRecipeName: string;
    public filterRecipe$ = new Subject<string>();
    public errorMsg: string;

    constructor(private _recipeDataService: RecipeDataService) {
        this.filterRecipe$
            .pipe(
                distinctUntilChanged(),
                debounceTime(400),
                map(val => val.toLowerCase())

            )
            .subscribe(
                val => (this.filterRecipeName = val)
            );
    }

    ngOnInit() {
      this._recipeDataService.recipes.subscribe(items => {
        this._recipes = items;
      },
            (error: HttpErrorResponse) => {
                this.errorMsg = `Error ${error.status} while trying to retrieve recipes: ${error.error}`;
            }
        );

    }

    get recipes() {
        return this._recipes;
    }

    applyFilter(filter: string) {
        this.filterRecipeName = filter;
    }

    removeRecipe(recipe: Recipe) {
        this._recipeDataService
            .removeRecipe(recipe)
            .subscribe(item => (
                this._recipes = this._recipes.filter(val =>
                    item.id !== val.id)),
                (error: HttpErrorResponse) => {
                    this.errorMsg = `Error ${error.status} while removing recipe for ${recipe.name}: ${error.error}`;
                }
            );
    }
}
