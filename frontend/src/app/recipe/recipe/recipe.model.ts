import { Ingredient } from '../ingredient/ingredient.model';

export class Recipe {

    private _id: string;
    private _name: string;
    private _dateAdded: Date;
	private _ingredients: Ingredient[];
	private _chef: String;

    constructor(name: string, ingredients: Ingredient[] = [],
        dateAdded: Date = null) {
        this._name = name;
        this._ingredients = ingredients;
        this._dateAdded = dateAdded ? dateAdded : new Date();
    }

    static fromJSON(json: any): Recipe {
        const recipe = new Recipe(json.name, json.ingredients.map(Ingredient.fromJSON), json.created);
			recipe._id = json._id;
			recipe._chef = json.chef;
        return recipe;

    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            ingredients: this._ingredients.map(ingredient => ingredient.toJSON()),
					created: this._dateAdded,
						chef: this._chef
        };
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get dateAdded(): Date {
        return this._dateAdded;
    }

    get ingredients(): Ingredient[] {
        return this._ingredients;
    }

    addIngredient(ingredient: Ingredient) {
        this._ingredients.push(ingredient);
    }
}
