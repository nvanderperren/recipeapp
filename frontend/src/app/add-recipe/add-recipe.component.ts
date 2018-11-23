import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
    @Output() public newRecipe = new EventEmitter<Recipe>();
    public recipe: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.recipe = this.fb.group({
            name: ['risotto']
        });
    }

    /* addRecipe(newRecipeName: HTMLInputElement): boolean {
        console.log(newRecipeName.value);
        const recipe = new Recipe(newRecipeName.value);
        this.newRecipe.emit(recipe);
        return false;
    } */

    onSubmit() {
        this.newRecipe.emit(new Recipe(this.recipe.value.name));
        console.log(this.recipe.value.name);
    }

}
