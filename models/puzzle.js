// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  puzzle: String,
  answer: String,
  text: String,
  point: String
});

/*
PlaceSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });
*/

mongoose.model('Place', PlaceSchema);

