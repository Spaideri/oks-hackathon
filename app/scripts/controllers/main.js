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

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

	// start the map in South-East England
	map.setView(new L.LatLng(60.1708, 24.9375),9);
	map.addLayer(osm);

    LocationResource.getLocations().then(function getLocationsSuccess(data) {
      console.log('data', data);
    });

    $scope.foo = 'bar';

  });
