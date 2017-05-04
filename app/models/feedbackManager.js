var mongoose = require('mongoose'),
  	Feedback = mongoose.model('Feedback');

module.exports = {
	getFeedbacks: function(callback){
		Feedback.find(function (err, result) {
  			callback(result);
		  });
	},
	
	addFeedback: function(newFeedback){
		var feedback = new Feedback(newFeedback);
		feedback.save(function (err) {
  			if(err)
			    console.log(err);
			else
		        console.log(newFeedback._id + ' was written to db');
		  });
	}
	
}