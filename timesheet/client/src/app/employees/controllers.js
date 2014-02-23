(function () {
  'use strict';

  angular.module('employee.controllers', [])
    
    .controller('EmployeeCtrl', 
      function ($control, $scope, $state, $stateParams, securityContext) {

        $scope.requestEmployees = function requestEmployees() {
          $control.list('timesheets', {userId: securityContext.user._id})
            .then(function (timesheets) {
              $scope.timesheets = timesheets;
            });
        };

        $scope.requestEmployees();

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

    .controller('EmployeeDetailCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('EmployeeCreateCtrl', 
      function ($scope, $state, $stateParams) {

      }
    );

}());