(function () {
  
  'use strict';

  var app = angular.module('app.projects', [
    'app.projects.controllers',
    'ui.router',
    'security'
  ]);

  app.config(function ($stateProvider, authorizationProvider) {

    $stateProvider
      .state('app.projects', {
        url: '/projects',
        controller: 'ProjectCtrl',
        templateUrl: 'assets/templates/app/projects/index.html',
        data: {
          section: 'Project: List'
        }, 
        resolve: {
          authenticatedUser: authorizationProvider.requireAuthenticatedUser
        }
      })  

      .state('app.projects.detail', {
        url: '/:id',
        controller: 'ProjectDetailCtrl',
        templateUrl: 'assets/templates/app/projects/detail.html',
        data: {
          section: 'Project: Detail'
        }
      })

      .state('app.projects.create', {
        url: '/create',
        controller: 'ProjectCreateCtrl',
        templateUrl: 'assets/templates/app/projects/form.html',
        data: {
          section: 'Project: Create'
        }
      })

      // -------------  Login ----------------
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
