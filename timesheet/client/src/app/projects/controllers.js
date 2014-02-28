(function () {
  'use strict';

  angular.module('app.projects.controllers', [])
    
    .controller('ProjectCtrl', 
      function ($control, $scope, $state, $stateParams, notifications) {

        $scope.requestProjects = function requestProjects (page) {
          var query = {
            page: page,
            sort: {name: 1}
          };

          $control.page('projects', query)
            .then(function (pageConfig) {
              $scope.pageConfig = pageConfig;
            });
        };

        $scope.showDetail = function showDetail (project) {
          $state.go('app.projects.detail', project);
        };

        $scope.createNew = function createNew () {
          $state.go('app.projects.create', $stateParams);
        };

        $scope.remove = function remove (project) {
          var deleted = angular.extend(project, {deleted: true});

          $control.remove('projects', deleted)
            .then(function (removed) {
              notifications.success('Project : ' + removed.name + ', was deleted.');
            },
            function (err) {
              notifications.error('Error attempting to delete project.');
            });
        };

        $scope.restore = function restore (project) { 
          var deleted = angular.extend(project, {deleted: false});

          $control.create('projects', deleted) 
            .then(function (restored) {
              notifications.success('Project was restored.');
              project._id = restored._id;
            },
            function (err) {
              notifications.error('Error restoring project.');
            });
        };

        $scope.cancel = function cancel () {
          $state.go('app.projects', {}, {reload: true});
        };

        $scope.requestProjects(1);
      }
    )

    .controller('ProjectDetailCtrl', 
      function ($scope, $state, $stateParams, notifications, project) {
        $scope.saveText = $state.current.data.saveText;
        $scope.project = project;

        $scope.save = function save () {
          $scope.project.$update()
            .then(function (updated) {
              $scope.project = updated;
              notifications.success('Updated project: ' + updated.name);
            },  
            function (err) {
              notifications.error('There was an error updating the employee.');
            });
        };
      }
    )

    .controller('ProjectCreateCtrl', 
      function ($scope, $state, $stateParams, $control, notifications) {
        $scope.saveText = $state.current.data.saveText;
        $scope.project = {};

        $scope.save = function save () {
          $control.create('projects', $scope.project) 
            .then(function (created) {
              $state.go('app.projects.detail', created);
              notifications.success('Project : ' + created.name + ', created.');
            },
            function (err) {
              notifications.error('There was an error creating the project.');
            });
        };
      }
    );

}());