/* Custom Map library built on top of Google Maps. Custom library was built to create dry code where redundancies were being used and for potential future use. */
(function(window, google){

	var Mapster = (function(){
		function Mapster(element, ops){
			this.gMap = new google.maps.Map(element, ops); 
		}

	Mapster.prototype = {
	 	_on: function(event, callback){
	 		var self = this;
	 		google.maps.event.addListener(this.gMap, event, function(e){
	 			callback.call(self, e);
	 		});
	 	},
	 	addMarker: function(lat, lng){
	 		console.log("lat:", lat);
	 		console.log("lng:", lng);
	 		this._createMarker(lat,lng);
	 	},
	 	_createMarker: function(lat, lng){
	 		var opts = {
	 			position: {
	 				lat: lat,
	 				lng: lng
	 			},
	 			map: this.gMap
	 		};
	 		return new google.maps.Marker(opts);
	 	}
	};
	 return Mapster;
	}());

	Mapster.create = function(element, opts){
		return new Mapster(element, opts);
	};

	window.Mapster = Mapster;

}(window, google));