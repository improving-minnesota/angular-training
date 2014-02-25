(function () {
  'use strict';

  var resources = angular.module('app.resources', [])
    .factory('$control', 
      function ($q, $api) {

        var control = {

          page : function (resource, query) {        
            return $api[resource].paged(query).$promise;
          },

          list : function (resource, query) {
            var queryObject = {};

            if (angular.isObject(query)) {
              queryObject = angular.extend(queryObject, query);
            }

            return $api[resource].query(queryObject).$promise;
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

        var extraMethods = {
          'paged' : {
            method: 'GET'
          },
          'update' : {
            method: 'PUT'
          },
          'restore' : {
            method: 'PUT',
            params: {
              verb: 'restore'
            }
          }
        };

        var api = {

          timesheets : $resource('/users/:userId/timesheets/:id', {
            userId: '@userId',
            id: '@id'
          },
          extraMethods),

          projects : $resource('/projects/:id', {
            id: '@id'
          },
          extraMethods),

          employees : $resource('/users/:id', {
            id: '@id'
          },
          extraMethods),

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
