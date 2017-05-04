var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  //Place = mongoose.model('Place');
  placeManager = require('../models/puzzleManager.js')
  feedbackManager = require('../models/feedbackManager.js')

var state = 'hello';
var current, amount;
var i, n;
var arr_places;

module.exports = function (app) {
  app.use('/', router);
};

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

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

      index = req.body.time;
      //index = req.body.getElementByName("time").selectedIndex;

      if (index == "<1 часа"){
        n = 3;
      }
      else if (index == "1-2 часа"){
        n = 6;
      }
      else if (index == ">2 часов"){
        n = 10;
      }

      placeManager.getPlaces(function (places) {
        arr_places = places;
        shuffle(arr_places);
        arr_places = arr_places.slice(0, n); // take n first
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
      state = 'finish';
      feedbackManager.addFeedback({
        "route": arr_places,
        "mark": req.body.mark,
        "comment": req.body.recension,
      });
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