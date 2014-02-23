(function () {
  'use strict';

  angular.module('project.controllers', [])
    
    .controller('ProjectCtrl', 
      function ($control, $scope, $state, $stateParams, securityContext) {

        $scope.requestProjects = function requestProjects() {
          $control.list('projects')
            .then(function (projects) {
              $scope.projects = projects;
            });
        };

        $scope.requestProjects();

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