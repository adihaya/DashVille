var parameters = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
var map;
var gTrafficLayer;
var geocoder;
window.addEventListener("DOMContentLoaded", init);

function init() {
  google.maps.event.addDomListener(window, "load", initMaps);
};

function initMaps() {
  geocoder = new google.maps.Geocoder();
  google.maps.visualRefresh = true;
  var mapDiv = document.getElementById("map-canvas");
  var mapOptions = {
    overviewMapControl: true,
    panControl: false,
    center: new google.maps.LatLng(37.788081, - 122.409668),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId[parameters.mapType],
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    }		
  };
  map = new google.maps.Map( mapDiv, mapOptions );
  
  loadSearchBox();
  loadTrafficControl();
  displayDefaultLocation();
};

function loadSearchBox() {
  
  var searchBox = document.getElementById("mainSearchBox");
  var searchButtonBox = document.getElementById("buttonSearchBox");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchButtonBox);
  
  var input = document.querySelector("#mainSearchBox>.searchInput");
  if(parameters.placeholder){
    input.setAttribute("placeholder", decodeURI(parameters.placeholder));
  };
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  
  window.addEventListener("message", function() {
    var message = event.data;
    if(message == "focusSearchbox"){
      input.focus();
    };
  });
  
  window.infowindow = new google.maps.InfoWindow();
  window.marker = new google.maps.Marker({
    map: map
  });
  input.addEventListener("keypress", function(e) {
    if (!e) {
      e = window.event;
    };
    if (e.keyCode == 13) {
      codeAddress(unescape(encodeURIComponent(this.value)), true);
      this.blur();
    };
  });
  
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    browseToAddress( autocomplete.getPlace(), true );
  });
};

function loadTrafficControl() {
  var trafficButton = document.getElementById("trafficButton");
  gTrafficLayer = new google.maps.TrafficLayer;
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(trafficButton);
  changeTrafficMode(parameters.traffic == "true" ? "on" : "off");
  trafficButton.addEventListener("click", function() {
    changeTrafficMode(this.className == "off" ? "on" : "off");
  });
};

function changeTrafficMode(state) {
  gTrafficLayer.setMap( (state == "on") ? map : undefined );
  document.getElementById("trafficButton").className = state;
};

function codeAddress(query, markerAndBubble) {
  geocoder.geocode( { "address": query}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      browseToAddress(results[0], markerAndBubble);
    };
  });
};

function browseToAddress(place, markerAndBubble){
  if(place.geometry){
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
    else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); 
    };
  };
  
  if(markerAndBubble) {
    infowindow.close();
    marker.setPosition(place.geometry.location);
    
    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    };
    var name = place.name ? place.name : place.address_components[0].short_name;
    infowindow.setContent('<div><strong>' + name + '</strong><br>' + address);
    
    infowindow.open(map, marker);
  };
};

function displayDefaultLocation(){
  console.log(parameters.defaultLocation);
  console.log(decodeURI(parameters.defaultLocation));
  if(parameters.defaultLocation){
    geocoder.geocode( { "address": decodeURI(parameters.defaultLocation)}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        browseToAddress(results[0], false);
      };
    });
  };
};
