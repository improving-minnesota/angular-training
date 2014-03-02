(function () {
  'use strict';

  var resources = angular.module('app.resources', ['ngResource'])
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

          get : function (resource, query) {
              return $api[resource].get(query).$promise;
          },

          create : function (resource, model) {
            var saved = new $api[resource](model).$save();
            return saved.$promise || saved;
          }, 

          update : function (resource, model) {
            var updated = $api[resource].update(model);
            return updated.$promise || updated;
          },

          remove : function (resource, model) {
            model.deleted = true;
            return control.update(resource, model);
          },

          restore : function (resource, model) {
            model.deleted = false;
            return control.update(resource, model);
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

          timesheets : $resource('/users/:user_id/timesheets/:_id', {
            user_id: '@user_id',
            _id: '@_id'
          },
          extraMethods),

          timeunits : $resource('/users/:user_id/timesheets/:timesheet_id/timeunits/:_id', {
            user_id: '@user_id',
            timesheet_id: '@timesheet_id',
            _id: '@_id'
          },
          extraMethods),

          projects : $resource('/projects/:_id', {
            _id: '@_id'
          },
          extraMethods),

          employees : $resource('/users/:_id', {
            _id: '@_id'
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
