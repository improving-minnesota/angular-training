(function () {
  'use strict';

  angular.module('app.employees.controllers', [])
    
    .controller('EmployeeCtrl', 
      function ($control, $scope, $state, $stateParams, securityContext) {

        $scope.requestEmployees = function requestEmployees() {
          $control.list('employees')
            .then(function (employees) {
              $scope.employees = employees;
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