(function () {
  'use strict';

  angular.module('app.controllers', [])
    .controller('AppCtrl', 
      function ($scope, $state, $stateParams){
        
      }
    )
    .controller('NavCtrl', 
      function ($scope, $state, $stateParams, securityContext, authentication) {
        
        $scope.$watch(function () {
          return securityContext.authenticated;
        },
        function (authenticated) {
          $scope.authenticated = authenticated;
        });

        $scope.logout = function logout () {
          authentication.logout();
        };
      }
    )
    .controller('TimesheetCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetDetailCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetEditCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetCreateCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimeunitCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimeunitDetailCtrl', 
      function ($scope, $state, $stateParams) {

      }
    );

}());