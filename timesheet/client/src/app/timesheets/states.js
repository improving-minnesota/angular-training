(function () {
  
  'use strict';

  var app = angular.module('app.timesheets', [
    'app.timesheets.controllers',
    'ui.router',
    'authorization.services'
  ]);

  app.config(function ($stateProvider, authorizationProvider) {

    $stateProvider
      .state('app.timesheets', {
        url: '/users/:user_id/timesheets',
        controller: 'TimesheetCtrl',
        templateUrl: 'assets/templates/app/timesheets/index.html',
        data: {
          section: 'Timesheet: List'
        }, 
        resolve: {
          authenticatedUser: authorizationProvider.requireAuthenticatedUser
        }
      })

      .state('app.timesheets.detail', {
        url: '/detail/:_id',
        controller: 'TimesheetDetailCtrl',
        templateUrl: 'assets/templates/app/timesheets/detail.html',
        data: {
          section: 'Timesheet: Detail'
        },
        resolve : {
          timesheet : [
            '$control', 
            '$stateParams', 
            function ($control, $stateParams) {
              return $control.get('timesheets', $stateParams);
            }
          ],
          timeunits : [
            '$control',
            '$stateParams',
            function ($control, $stateParams) {
              return $control.list('timeunits', {timesheet_id: $stateParams._id, user_id: $stateParams.user_id});
            }
          ]
        }
      })

      .state('app.timesheets.detail.edit', {
        url: '/edit',
        controller: 'TimesheetEditCtrl',
        templateUrl: 'assets/templates/app/timesheets/form.html',
        data: {
          section: 'Timesheet: Edit',
          saveText: 'Update'
        }
      })

      .state('app.timesheets.create', {
        url: '/create',
        controller: 'TimesheetCreateCtrl',
        templateUrl: 'assets/templates/app/timesheets/form.html',
        data: {
          section: 'Timesheet: Create',
          saveText: 'Create'
        }
      });
  });

}());
