import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeDataService } from '../recipe-data.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private _recipe: Recipe;

  constructor(private route: ActivatedRoute,
    private _recipeDataService: RecipeDataService
  ) { }

  get recipe(): Recipe {
    return this._recipe;
  }

  ngOnInit() {
    this.route.data.subscribe(item =>
      this._recipe = item['recipe']);
  }

}
