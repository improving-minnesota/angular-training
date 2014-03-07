angular.module('app.security', [
  'app.security.controllers',
  'ui.router'
])
.config(function ($stateProvider) {

  $stateProvider
    // -------------  Login ----------------
    .state('app.login', {
      url: '/login?redirect',
      templateUrl: 'assets/templates/app/security/login/index.html',
      controller: 'LoginCtrl',
      data: {
        section: 'Please Log In'
      }
    });
})

.run(function ($api) {
  
  $api.add({
    resource: 'login',
    url: '/login',
    params: {},
    methods: {
      'login' : {
        method: 'POST'
      },
      'current' : {
        method: 'GET'
      }
    },
    unnatural: true
  });

  $api.add({
    resource: 'logout',
    url: '/logout',
    params: {},
    methods: {
      'logout' : {
        method: 'POST'
      }
    },
    unnatural: true
  });
});