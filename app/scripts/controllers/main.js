'use strict';

/**
 * @ngdoc function
 * @name oksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oksApp
 */
angular.module('oksApp')

  .factory('LocationResource', function($http, $q) {

    var initializePromise;

    function initialize() {
      if(initializePromise === undefined) {
        initializePromise = $http.get('/api/init');
      }
      return initializePromise;
    }

    function updateLocation(lat, lon) {
      var deferred = $q.defer();
      initialize().then(function initializeSuccess(data) {

        var locationObject = {
          uuid: data.data.uuid,
          location: {
            lat: lat,
            lon: lon
          }
        };
        $http.post('/api/location', locationObject).then(function locationSuccess(locationData) {
          var locationData = {
            uuid: data.data.uuid,
            data: locationData
          };
          deferred.resolve(locationData);
        });
      });
      return deferred.promise;
    }

    initialize();

    return {
      updateLocation: updateLocation
    };

  })

  .controller('MainCtrl', function ($scope, $timeout, LocationResource) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var map = new L.Map('map');

    // code taken from leaflet's documentation
    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 20, attribution: osmAttrib});

    // start the map in Helsinki
    map.setView(new L.LatLng(60.1708, 24.9375), 14);
    map.addLayer(osm);

    var circleMe;
    var others = {};

    function updateLocation() {
      $timeout(function() {
        navigator.geolocation.getCurrentPosition(function (position) {
          var xoff = (Math.floor(Math.random() * 10) - 5) / 1000;
          var yoff = (Math.floor(Math.random() * 10) - 5) / 1000;

          var mylat = position.coords.latitude + xoff;
          var mylon = position.coords.longitude + yoff;

          if(circleMe === undefined) {
            circleMe = L.circle([mylat, mylon], 100, {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5
            }).addTo(map);
          }
          
          var newLatLng = new L.LatLng(mylat, mylon);
          circleMe.setLatLng(newLatLng); 

          circleMe.bindPopup("Minä - paikalla nyt");

          LocationResource.updateLocation(mylat, mylon).then(function updateSuccess(data) {
            _.forOwn(data.data.data, function(value, key){
              if(data.uuid !== key){
                if(others[key] === undefined) {
                  others[key] = L.marker([value.lat, value.lon]).addTo(map);
                  others[key].bindPopup(key);
                } else {
                  var newLatLng = new L.LatLng(value.lat, value.lon);
                  others[key].setLatLng(newLatLng);
                }
              }

            });
          });
        });
        updateLocation();
      }, 3000);
    }

    updateLocation();

  });
