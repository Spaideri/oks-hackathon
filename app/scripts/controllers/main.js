'use strict';

/**
 * @ngdoc function
 * @name oksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oksApp
 */
angular.module('oksApp')

  .factory('LocationResource', function($http) {
    function getLocations() {
      return $http.get('/foo');
    }

    return {
      getLocations: getLocations
    };

  })

  .controller('MainCtrl', function ($scope, LocationResource) {
    console.log('mainc');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log('foob', LocationResource);

    map = new L.Map('map');

    // code taken from leaflet's documentation
	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 20, attribution: osmAttrib});

	// start the map in Helsinki
	map.setView(new L.LatLng(60.1708, 24.9375), 14);
	map.addLayer(osm);

    // add per-user markers & popups
    var markerSimo = L.marker([60.1715, 24.9300]).addTo(map);
    var markerOsmo = L.marker([60.1711, 24.9316]).addTo(map);
    markerSimo.bindPopup("Simo - paikalla 2:35");
    markerOsmo.bindPopup("Osmo-Inkeri - paikalla 16 sekuntia");

    LocationResource.getLocations().then(function getLocationsSuccess(data) {
      console.log('data', data);
    });

    // Get my location and add it as a dircle
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("success: " + position.coords.latitude, position.coords.longitude);
          var circleMe = L.circle([position.coords.latitude, position.coords.longitude], 100, {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5
          }).addTo(map);

          circleMe.bindPopup("Minä - paikalla nyt");
        });
    } else {
        console.log("no geolocation!");
    }

    $scope.foo = 'bar';

  });
