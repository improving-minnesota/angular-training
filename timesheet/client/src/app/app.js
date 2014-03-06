angular.module('app', [
  'ui.router',
  'app.values',
  'app.resources',
  'app.controllers',
  'app.employees',
  'app.projects',
  'app.timesheets',
  'app.timesheets.timeunits',
  'app.security'
])

  .config(function ($stateProvider) {

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
      });
  });
  