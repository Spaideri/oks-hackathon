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

    LocationResource.getLocations().then(function getLocationsSuccess(data) {
      console.log('data', data);
    });

    $scope.foo = 'bar';

  });
