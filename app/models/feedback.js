var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  route: String,
  mark: String,
  comment: String,
});

mongoose.model('Feedback', FeedbackSchema);

