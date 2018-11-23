export class Recipe {

    private _id: string;
    private _name: string;
    private _dateAdded: Date;
    private _ingredients = new Array<string>();

    static fromJSON(json: any): Recipe {
        const record = new Recipe(json.name, json.ingredients, json.created);
        record._id = json._id;
        return record;

    }

    constructor(name: string, ingredients: string[] = [],
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

    get ingredients(): string[] {
        return this._ingredients;
    }

    addIngredient(name: string, amount?: number, unit?: string) {
        this._ingredients.push(`${amount || 1} ${unit || ''} ${name}`);
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
