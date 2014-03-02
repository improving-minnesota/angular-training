(function () {
  
  'use strict';

  var app = angular.module('app.employees', [
    'app.employees.controllers',
    'ui.router',
    'authorization.services'
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
        url: '/detail/:_id',
        controller: 'EmployeeDetailCtrl',
        templateUrl: 'assets/templates/app/employees/form.html',
        data: {
          section: 'Employee: Detail',
          saveText: 'Update'
        },
        resolve : {
          employee : [
            '$control', 
            '$stateParams',
            function ($control, $stateParams) {
              return $control.get('employees', $stateParams);
            }]
        }
      })

      .state('app.employees.create', {
        url: '/create',
        controller: 'EmployeeCreateCtrl',
        templateUrl: 'assets/templates/app/employees/form.html',
        data: {
          section: 'Employee: Create',
          saveText: 'Create'
        }
      });
  });

}());
