(function () {
  'use strict';

  angular.module('project.controllers', [])
    
    .controller('ProjectCtrl', 
      function ($control, $scope, $state, $stateParams, securityContext) {

        $scope.requestTimesheets = function requestTimesheets() {
          $control.list('timesheets', {userId: securityContext.user._id})
            .then(function (timesheets) {
              $scope.timesheets = timesheets;
            });
        };

        $scope.requestTimesheets();

        $scope.totalItems = 64;
        $scope.currentPage = 4;
        $scope.maxSize = 5;
        
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };

        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
      }
    )

    .controller('ProjectDetailCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('ProjectCreateCtrl', 
      function ($scope, $state, $stateParams) {

      }
    );

}());