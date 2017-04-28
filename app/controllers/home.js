var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  //Place = mongoose.model('Place');
  placeManager = require('../models/puzzleManager.js')

var state = 'hello';
var current, amount;
var i, n;
var arr_places;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  //Place.find(function (err, places) {
    //if (err) return next(err);
    res.render('index', {
      state: state,
      title: 'Генератор городских квестов',
    });
  //});
});

router.post('/', function (req, res, next) {
  if (state == 'hello') {
      state = 'generate';
      res.render('index', {
      state: state,
      title: 'Генератор городских квестов',
      });  
  } else if (state == 'generate') {
      state = 'play';
      i = 0;
      n = 2; // TODO

      placeManager.getPlaces(function (places) {
        arr_places = places;
        res.render('index', {
        state: state,
        title: 'Генератор городских квестов',
        current: i+1,
        amount: n,
        place: arr_places[i],
        });
      });
  } else if (state == 'play') {
    if (req.body.answer.toLowerCase() == arr_places[i].answer.toLowerCase()) {
      ++i;
      if (i>=n){
        state = 'feedback';
      }
    }
    res.render('index', {
      state: state,
      title: 'Генератор городских квестов',
      current: i+1,
      amount: n,
      place: arr_places[i],
    });
  } else if (state == 'feedback'){
      state = 'finish',
      res.render('index', {
      state: state,
      title: 'Генератор городских квестов',
      });
  } else if (state == 'finish'){
    state = 'generate';
      res.render('index', {
      state: state,
      title: 'Генератор городских квестов',
      });
  }
})