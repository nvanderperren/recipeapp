import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Ingredient } from '../ingredient/ingredient.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RecipeDataService } from '../recipe-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
    public recipe: FormGroup;
    public readonly unitTypes = ['', 'Liter', 'Gram', 'Tbsp'];
    public errorMsg: string;

    constructor(private fb: FormBuilder,
        private _reciepeDataService: RecipeDataService) { }

    get ingredients(): FormArray {
        return <FormArray>this.recipe.get('ingredients');
    }

    ngOnInit() {
        this.recipe = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            ingredients: this.fb.array([this.createIngredients()])
        });

        this.ingredients.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe(ingList => {
            if (ingList != null || ingList !== []) {
              const lastElement = ingList[ingList.length - 1];
                if (lastElement.ingredientname.length > 2) {
                    this.ingredients.push(this.createIngredients());
                } else if (ingList.length >= 2) {
                    const secondToLast = ingList[ingList.length - 2];
                    if (!lastElement.ingredientname && !lastElement.amount && !lastElement.unit &&
                        (!secondToLast.ingredientname || secondToLast.ingredientname.length < 2)) {
                        this.ingredients.removeAt(this.ingredients.length - 1);
                        }
                }
              }
            });
    }

    onSubmit() {
        const recipe = new Recipe(this.recipe.value.name);
        for (const ing of this.recipe.value.ingredients) {
            if (ing.ingredientname.length > 2) {
                recipe.addIngredient(new Ingredient(ing.ingredientname, ing.amount, ing.unit));
            }
        }
        this._reciepeDataService.addNewRecipe(recipe).subscribe(
          () => {},
            (error: HttpErrorResponse) => {
                this.errorMsg = `Error ${error.status} while adding recipe for ${recipe.name}: ${error.error}`;
            }
        );

    }

    createIngredients(): FormGroup {
        return this.fb.group({
            amount: [''],
            unit: [''],
            ingredientname: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

}
