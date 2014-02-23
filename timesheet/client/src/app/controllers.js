(function () {
  'use strict';

  angular.module('app.controllers', [])

    .controller('MainCtrl', function ($scope, securityContext){
      
      $scope.$watch(function () {
        return securityContext.authenticated;
      },
      function (authenticated) {
        $scope.authenticated = authenticated;
      });

    })
    
    .controller('AppCtrl', 
      function ($scope, $state, $stateParams){
        
      }
    )

    .controller('NavCtrl', 
      function ($scope, $state, $stateParams, securityContext, authentication) {
      
        $scope.logout = function logout () {
          authentication.logout();
        };
      }
    );

}());