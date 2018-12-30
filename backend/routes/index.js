var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Recipe = mongoose.model('Recipe');
let Ingredient = mongoose.model('Ingredient');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('server works');
});

router.get('/API/recipes/', function (req, res, next) {
    let query = Recipe.find({}).populate('ingredient');
    query.exec(function(err, recipes) {
        if (err) { return next(err); }
        res.json(recipes);
    });
});

router.post('/API/recipes/', function (req, res, next) {
    console.log(req.body);
    Ingredient.create(req.body.ingredients, function (err, ings) {
        if (err) return next(err);
        let recipe = new Recipe({
            name: req.body.name,
            created: req.body.created
        });
        recipe.ingredients = ings;
        recipe.save(function (err, record) {
            if (err) {
                Ingredient.remove({ _id: { $in: recipe.ingredients } });
                return next(err);
            }
            res.json(record);
        });
    });
});

router.param('recipe', function (req, res, next, id) {
    let query = Recipe.findById(id).populate('ingredient');
    query.exec(function (err, recipe) {
        if (err) return next(err);
        if (!recipe) { return next(new Error('not found ' + id)); }
        req.recipe = recipe;
        return next()
    });
});


router.get('/API/recipe/:recipe', function (req, res, next) {
    res.json(req.recipe);
});

router.delete('/API/recipe/:recipe', function (req, res) {
    Ingredient.remove({ _id: { $in: req.recipe.ingredients } },
        function (err) {
            if (err) return next(err);
            req.recipe.remove(function (err) {
                if (err) { return next(err); }
                res.json(req.recipe);
            });
    });
});

router.post('/API/recipe/:recipe/ingredients', function (req, res, next) {
    let ing = new Ingredient(req.body);

    ing.save(function(err, ingredient) {
        if (err) return next(err);

        req.recipe.ingredients.push(ingredient);
        req.recipe.save(function (err, record) {
            if (err) return next(err);
            res.json(ingredient)
        })
    })
})

router.put('/API/recipe/:recipe', function (req, res, next) {
    req.recipe.save(function (err) {
        if (err) { return next(err); }
        res.json(req.recipe);
    });
});

module.exports = router;
