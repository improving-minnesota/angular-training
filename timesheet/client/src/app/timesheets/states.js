(function () {
  
  'use strict';

  var app = angular.module('app.timesheets', [
    'app.timesheets.controllers',
    'ui.router',
    'security'
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
      })

      .state('app.timesheets.detail.timeunits', {
        abstract: true,
        url: '/timeunits',
        controller: 'TimeunitCtrl',
        template: '<div ui-view></div>',
        resolve: {
          projects: [
            '$control', 
            function ($control) {
              return $control.list('projects');
            }]
        }
      })

      .state('app.timesheets.detail.timeunits.create', {
        url: '/create',
        controller: 'TimeunitCreateCtrl',
        templateUrl: 'assets/templates/app/timesheets/timeunits/form.html',
        data: {
          section: 'Timesheet: Log Time'
        }
      })

      .state('app.timesheets.detail.timeunits.edit', {
        url: '/edit/:timeunit_id',
        controller: 'TimeunitEditCtrl',
        templateUrl: 'assets/templates/app/timesheets/timeunits/form.html',
        data: {
          section: 'Timesheet: Edit Time'
        },
        resolve : {
          timeunit : [
            '$control', 
            '$stateParams', 
            function ($control, $stateParams) {
              return $control.get('timeunits', {_id: $stateParams.timeunit_id, user_id: $stateParams.user_id, timesheet_id: $stateParams._id});
            }]
        }
      });
  });

}());
