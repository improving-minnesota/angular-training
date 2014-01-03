(function () {
  'use strict';

  var logger = window.debug;

  angular.module('admin.controllers', [
    'common.formatting.filters'
  ])
    .controller('AdminController', [
      '$scope',
      function ($scope) {
         
      }
    ])

    .controller('AdminSeasonsController', [
      '$scope',
      '$state',
      '$control',
      function ($scope, $state, $control) {

        $scope.getSeasons = function (page) {
          $control.getAll('season', page).then(function (seasons) {
            $scope.seasons = seasons;
          });
        };

        $scope.createNew = function createNew () {
          $state.go('admin.seasons.create');
        };

        $scope.showDetail = function showDetail (propertyId) {
          $state.go('admin.seasons.detail', {id: propertyId});
        };

        $scope.getSeasons(0);
      }
    ])

    .controller('AdminSeasonsCreateController', [
      '$scope',
      '$state',
      function ($scope, $state) {

        $scope.season = {
          startDate: null,
          endDate: null
        };

        $scope.create = function create () {
          $state.go('admin.seasons');
        };

        $scope.cancel = function cancel () {
          $state.go('admin.seasons');
        };

      }
    ])

    .controller('AdminSeasonsDetailController', [
      '$scope',
      '$state',
      '$stateParams',
      '$control',
      function ($scope, $state, $stateParams, $control) {

        $scope.requestSeason = function () {
          $control.get('season', $stateParams.seasonId).then(function (season) {
            $scope.season = season;
          });
        };

        $scope.update = function update () {
          $scope.season.$update(function(data){
            notifications.displayMessage({message : "Season " + data.name + " was updated.", type: 'success'});   
          }, function(err){
            notifications.displayMessage({message : "There was a problem updating " + data.name + ".", type: 'error'});  
          });
        };

        $scope.cancel = function cancel () {
          $state.go('admin.seasons');
        };

        $scope.requestSeason();
      }
    ])

    .controller('AdminTimeSlotsController', [
      '$scope',
      function ($scope) {

      }
    ])

    .controller('AdminPropertiesController', [
      '$scope',
      '$state',
      '$control',
      function ($scope, $state, $control) {

        $scope.getProperties = function (page) {
          $control.getAll('vacationProperty', page).then(function (properties) {
            $scope.properties = properties;
          });
        };

        $scope.search = function () {
          // $control.getPage('internalUser', 0, {q : $scope.q}).then(function (pageConfig){
          //   $scope.pagination = pageConfig;
          // });
        };

        $scope.showDetail = function showDetail (propertyId) {
          $state.go('admin.properties.detail', {id: propertyId});
        };

        $scope.createNew = function createNew () {
          $state.go('admin.properties.create');
        };

        $scope.getProperties(0);
      }
    ])

    .controller('AdminPropertiesCreateController', [
      '$scope',
      '$state',
      function ($scope, $state) {

        $scope.cancel = function cancel () {
          // refresh the model
          $state.go('admin.properties');
        };
      }
    ])

    .controller('AdminPropertiesDetailController', [
      '$scope',
      '$state',
      '$control',
      '$stateParams',
      function ($scope, $state, $control, $stateParams) {

        $scope.requestVacationProperty = function (propertyId) {
          $control.get('vacationProperty', propertyId).then(function (property) {
            $scope.property = property;
          });
        };

        $scope.update = function update () {
          $control.update('property', $scope.property).then(function (updatedProperty) {
            if (updatedUser.exception) {
              return notifications.displayMessage({message: 'Failed to update, ' + $scope.property.name + '.', type: 'error'});
            }
            else {
              return notifications.displayMessage({type: 'success', message: 'Updated ' + $scope.property.name + '.'});
            }
          });
        };

        $scope.cancel = function cancel () {
          // refresh the model
          $state.go('admin.properties');
        };

        $scope.requestVacationProperty($stateParams.id);
      }
    ]);

  logger.debug('Registered admin.AdminController');

}());