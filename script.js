(function initMap(window, google, mapster) {
	var options = {
	  center: {
	  	lat: 37.784318, 
	  	lng: -122.395144},
	  zoom: 13,
	  scrollwheel: true,
	  draggable: true,
	  maxZoom: 15,
	  minZoom: 11
	};
	var element = document.getElementById('map');
	var map = Mapster.create(element, options);

	/* Experimenting with my own event listener */
	// map._on('click', function(e){
	// 	console.log(e);
	// 	console.log(this);
	// });

	// map._on('dragend', function(){
	// 	alert("done dragging");
	// });

	var input = /** @type {!HTMLInputElement} */(
	    document.getElementById('pac-input'));
	//console.dir(map);
	var types = document.getElementById('type-selector');
	map.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	map.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);

	var infowindow = new google.maps.InfoWindow();
	var marker = map.addMarker(0, -29);

	autocomplete.addListener('place_changed', function() {
	  // infowindow.close();
	  marker.setVisible(false);
	  var place = autocomplete.getPlace();
	  if (!place.geometry) {
	    window.alert("Autocomplete's returned place contains no geometry");
	    return;
	  }

	  // If the place has a geometry, then present it on a map.
	  if (place.geometry.viewport) {
	    map.fitBounds(place.geometry.viewport);
	  } else {
	    map.setCenter(place.geometry.location);
	    map.setZoom(17);  // Why 17? Because it looks good.
	  }
	  marker.setIcon(/** @type {google.maps.Icon} */({
	    url: place.icon,
	    size: new google.maps.Size(71, 71),
	    origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(17, 34),
	    scaledSize: new google.maps.Size(35, 35)
	  }));
	  marker.setPosition(place.geometry.location);
	  marker.setVisible(true);

	  var address = '';
	  if (place.address_components) {
	    address = [
	      (place.address_components[0] && place.address_components[0].short_name || ''),
	      (place.address_components[1] && place.address_components[1].short_name || ''),
	      (place.address_components[2] && place.address_components[2].short_name || '')
	    ].join(' ');
	  }

	  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
	  infowindow.open(map, marker);
	});

	//Sets a listener on a radio button to change the filter type on Places
	//Autocomplete.
	function setupClickListener(id, types) {
	  var radioButton = document.getElementById(id);
	  radioButton.addEventListener('click', function() {
	    autocomplete.setTypes(types);
	  });
	}

	setupClickListener('changetype-all', []);
	setupClickListener('changetype-address', ['address']);
	setupClickListener('changetype-establishment', ['establishment']);
	setupClickListener('changetype-geocode', ['geocode']);
}(window, google, window.Mapster));