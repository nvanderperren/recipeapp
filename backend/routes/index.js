var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Recipe = mongoose.model('Recipe');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('server works');
});

router.get('/API/recipes/', function (req, res, next) {
    Recipe.find(function (err, recipes) {
        if (err) { return next(err); }
        res.json(recipes);
    });
});

router.post('/API/recipes/', function (req, res, next) {
    console.log(req.body);
    let recipe = new Recipe(req.body);
    recipe.save(function (err, record) {
        if (err) { return next(err); }
        res.json(record);
    });
});

module.exports = router;
