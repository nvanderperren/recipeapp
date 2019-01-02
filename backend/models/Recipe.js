let mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
  created: Date
});

mongoose.model('Recipe', RecipeSchema);

