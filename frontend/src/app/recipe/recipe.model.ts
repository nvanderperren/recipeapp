export class Recipe {
  private _name: string;
  private _dateAdded: Date = new Date();
  private _ingredients = new Array<string>();

  constructor(name: string) {
    this._name = name;
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
}
