import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Ingredient } from '../ingredient/ingredient.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
    @Output() public newRecipe = new EventEmitter<Recipe>();
    public recipe: FormGroup;
    public readonly unitTypes = ['', 'Liter', 'Gram', 'Tbsp'];

    constructor(private fb: FormBuilder) { }

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
                const lastElement = ingList[ingList.length - 1];
                if (lastElement.ingredientname.length > 2) {
                    this.ingredients.push(this.createIngredients());
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
        this.newRecipe.emit(recipe);

    }

    createIngredients(): FormGroup {
        return this.fb.group({
            amount: [''],
            unit: [''],
            ingredientname: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

}
