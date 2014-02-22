(function () {
  'use strict';

  angular.module('security.context', [])

  .factory('securityContext', function ($q) {

      var securityContext =  {

        user : {},
        authenticated : false,
        permissions : [],
        authorizedCompanies : [],
        institutionContext : undefined,
        csrf : null,

        reset : function () {
          securityContext.user = {};
          securityContext.authenticated = false;
          securityContext.permissions = [];
          securityContext.authorizedCompanies = [];
          securityContext.institutionContext = undefined;
          return securityContext;
        }
        
      };

      return securityContext;
    }
  );

}());