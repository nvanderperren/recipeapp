let mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
	created: Date,
  chef: String
});

mongoose.model('Recipe', RecipeSchema);

