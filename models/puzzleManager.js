var mongoose = require('mongoose'),
  	Place = mongoose.model('Place');

module.exports = {
	getPlaces: function(callback){
		Place.find(function (err, places) {
  			callback(places);
		  });
	},
	
	addPlace: function(placeToSave){
		var place = new Place(placeToSave);
		place.save(function (err) {
  			if(err)
			    console.log(err);
			else
		        console.log(placeToSave.name + ' was written to db');
		  });
	}
	
}