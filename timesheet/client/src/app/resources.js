(function () {
  'use strict';

  var resources = angular.module('app.resources', [])
    .factory('$control', 
      function ($q, $api) {

        var control = {

          getAll : function (resource, query) {
              return $api[resource].query(query || {}).$promise;
          },

          get : function (resource, id) {
              return $api[resource].get({id: id}).$promise;
          },

          create : function (resource, model) {
              return new $api[resource](model).$save().$promise;
          }, 

          update : function (resource, model) {
            var updated = $api[resource].update(model);
            return updated.$promise || updated;
          },

          login : function (model, current) {
            if (current) {
              return $api.login.current().$promise;
            }
            return $api.login.login(model).$promise;
          },

          logout : function () {
            return $api.logout.logout().$promise;
          }
        };

        return control;
      }
    )

    .factory('$api', 
      function ($resource) {

        var api = {

          // security
          login : $resource('/login', {}, {
            'login' : {
              method: 'POST'
            },
            'current' : {
              method: 'GET'
            }
          }),

          logout : $resource('/logout', {}, {
            'logout' : {
              method: 'POST'
            }
          })

        };

        return api;
      }
    );

}());
