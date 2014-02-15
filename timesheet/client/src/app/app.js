(function () {
  
  'use strict';

  var logger = window.debug;
  logger.group("Registering app module");

  var app = angular.module('app', [
    'app.directives', 
    'app.controllers',
    'app.resources',
    'app.services',
    'ui.router',
    'security'
  ]);

  app.config(function ($stateProvider, authorizationProvider) {
      
      $stateProvider
        .state('app', {
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
          //, resolve: {
          //   authenticatedUser: authorizationProvider.requireAuthenticatedUser
          // }
        })

        .state('app.timesheet', {
          url: '/timesheets',
          controller: 'TimesheetCtrl',
          templateUrl: 'assets/templates/app/timesheets/index.html',
          data: {
            section: 'Timesheet: List'
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
        });
  });

  logger.debug("App module bootstrapped.");
  logger.groupEnd(); 

}());
