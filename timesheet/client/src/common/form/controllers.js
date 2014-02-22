(function () {
  'use strict';

  angular.module('common.form.controllers', [])
    .controller('FormCtrl', function ($scope, $routeParams) {
         $scope.params = $routeParams;
      }
    );

}());