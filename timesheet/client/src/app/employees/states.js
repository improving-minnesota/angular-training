(function () {
  
  'use strict';

  var app = angular.module('app.employees', [
    'app.employees.controllers',
    'ui.router',
    'security'
  ]);

  app.config(function ($stateProvider, authorizationProvider) {

    $stateProvider
      .state('app.employees', {
        url: '/employees',
        controller: 'EmployeeCtrl',
        templateUrl: 'assets/templates/app/employees/index.html',
        data: {
          section: 'Employee: List'
        }, 
        resolve: {
          authenticatedUser: authorizationProvider.requireAuthenticatedUser
        }
      })

      .state('app.employees.detail', {
        url: '/:id',
        controller: 'EmployeeDetailCtrl',
        templateUrl: 'assets/templates/app/employees/detail.html',
        data: {
          section: 'Employee: Detail'
        }
      })

      .state('app.employees.create', {
        url: '/create',
        controller: 'EmployeeCreateCtrl',
        templateUrl: 'assets/templates/app/employees/form.html',
        data: {
          section: 'Employee: Create'
        }
      });
  });

}());
