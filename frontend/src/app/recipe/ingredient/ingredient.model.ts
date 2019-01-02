export enum UnitType {
    None,
    Liter,
    Gram,
    Tbsp
}

export class IngredientUnit {
    constructor(private _amount: number, private _unit: UnitType) { }

    get amount(): number {
        return this._amount;
    }
    get unit(): UnitType {
        return this._unit;
    }
}

export class Ingredient {
    private _id: string;
    private _name: string;
    private _ingredientUnit: IngredientUnit;

    static fromJSON(json): Ingredient {
        console.log(json);
        const record = new Ingredient(json.name, json.amount, json.unit);
        record._id = json._id;
        console.log(record._name);
        console.log(record._ingredientUnit);
        return record;
    }

    constructor(name: string, amount?: number, unit?: UnitType) {
        this._name = name;
        this._ingredientUnit = new IngredientUnit(amount || 1, unit || UnitType.None);
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._ingredientUnit.amount;
    }

    get unit(): UnitType {
        return this._ingredientUnit.unit;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            amount: this._ingredientUnit.amount,
            unit: this._ingredientUnit.unit === UnitType.None ? '' : this._ingredientUnit.unit
        };
    }


}
