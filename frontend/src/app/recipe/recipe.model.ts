export class Recipe {
  private _name: string;
  private _dateAdded: Date;
  private _ingredients = new Array<string>();

    constructor(name: string, ingredients: string[] = [],
        date = null) {
      this._name = name;
        this._ingredients = ingredients;
        this._dateAdded = date ? date : new Date();
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
            name: this._name,
            ingredients: this._ingredients,
            date: this._dateAdded
        };
    }
}
