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

module.exports = router;
