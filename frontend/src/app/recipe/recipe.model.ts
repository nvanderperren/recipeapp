import { Ingredient } from '../ingredient/ingredient.model';

export class Recipe {

    private _id: string;
    private _name: string;
    private _dateAdded: Date;
    private _ingredients: Ingredient[];

    static fromJSON(json: any): Recipe {
        const record = new Recipe(json.name, json.ingredients, json.created);
        record._id = json._id;
        return record;

    }

    constructor(name: string, ingredients: Ingredient[] = [],
        date = null) {
        this._name = name;
        this._ingredients = ingredients;
        this._dateAdded = date ? date : new Date();
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

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            ingredients: this._ingredients,
            date: this._dateAdded
        };
    }
}
