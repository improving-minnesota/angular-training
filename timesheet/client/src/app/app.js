(function () {
  
  'use strict';

  var app = angular.module('app', [
    'app.directives', 
    'app.controllers',
    'app.resources',
    'app.services',
    'ui.router',
    'security'
  ]);

  app.config(function ($logProvider, $stateProvider, authorizationProvider) {

      $stateProvider
        .state('app', {
          abstract: true,
          url: '/app',
          data: {
            title: 'The Timesheet App'
          },
          views : {
            'navbar' : {
              controller: 'NavCtrl',
              templateUrl: 'assets/templates/navigation/navbar/index.html'
            },
            'content' : {
              controller: 'AppCtrl',
              templateUrl: 'assets/templates/app/index.html'
            }
          }
        })

        .state('app.timesheet', {
          url: '/timesheets',
          controller: 'TimesheetCtrl',
          templateUrl: 'assets/templates/app/timesheets/index.html',
          data: {
            section: 'Timesheet: List'
          }, 
          resolve: {
            authenticatedUser: authorizationProvider.requireAuthenticatedUser
          }
        })

        .state('app.timesheet.detail', {
          url: '/:id',
          controller: 'TimesheetDetailCtrl',
          templateUrl: 'assets/templates/app/timesheets/detail.html',
          data: {
            section: 'Timesheet: Detail'
          }
        })

        .state('app.timesheet.detail.edit', {
          url: '/edit',
          controller: 'TimesheetEditCtrl',
          templateUrl: 'assets/templates/app/timesheets/edit.html',
          data: {
            section: 'Timesheet: Edit'
          }
        })

        .state('app.timesheet.create', {
          url: '/new',
          controller: 'TimesheetCreateCtrl',
          templateUrl: 'assets/templates/app/timesheets/create.html',
          data: {
            section: 'Timesheet: Create'
          }
        })

        .state('app.timesheet.timeunits', {
          url: '/timeunits',
          controller: 'TimeunitCtrl',
          templateUrl: 'assets/templates/app/timesheets/timeunits/index.html'
        })

        .state('app.timesheet.timeunits.detail', {
          url: '/create',
          controller: 'TimeunitDetailCtrl',
          templateUrl: 'assets/templates/app/timesheets/timeunits/detail.html',
          data: {
            section: 'Timesheet: Log Time'
          }
        })

        .state('app.login', {
          url: '/login?redirect',
          templateUrl: 'assets/templates/security/login/index.html',
          controller: 'LoginCtrl',
          data: {
            section: 'Please Log In'
          }
        });
  });

}());
