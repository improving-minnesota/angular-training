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
          }
        };

        return control;
      }
    )

    .factory('$api', 
      function ($resource, $apiUrl) {

        var api = {

          // security
          login : $resource($apiUrl + '/login', {}, {
            'login' : {
              method: 'POST',
              headers: {'X-Requested-With': 'XMLHttpRequest'}
            },
            'current' : {
              method: 'GET',
              headers: {'X-Requested-With': 'XMLHttpRequest'}
            }
          }),

          logout : $resource($apiUrl + '/logout', {}, {
            'logout' : {
              method: 'POST',
              headers: {'X-Requested-With': 'XMLHttpRequest'}
            }
          })

        };

        return api;
      }
    );
  
  resources.value('$apiUrl', '');

}());
