import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe/recipe.model';
import { RecipeDataService } from './recipe-data.service';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeDataService]
})
export class AppComponent implements OnInit {

    private _recipes: Recipe[];
    public filterRecipeName: string;
    public filterRecipe$ = new Subject<string>();

    ngOnInit(): void {
        this._recipeDataService.recipes.subscribe(
            items => this._recipes = items
        );
    }

    constructor(private _recipeDataService: RecipeDataService) {
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
        console.log(recipe.name);
        this._recipeDataService.addNewRecipe(recipe).subscribe(
            item => this._recipes.push(item)
        );
    }

    applyFilter(filter: string) {
        this.filterRecipeName = filter;
    }

    removeRecipe(recipe: Recipe) {
        this._recipeDataService
            .removeRecipe(recipe)
            .subscribe(item => (
                this._recipes = this._recipes.filter(val =>
                    item.id !== val.id)
            ));
    }


}
