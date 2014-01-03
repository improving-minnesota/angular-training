(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering admin.directives");

  angular.module('admin.directives', []);

  // Directives go here -----------

  // Example: 
    // .directive('sampleDirective', 
    //   function () {
    //     return {
    //       controller: AdminController,
    //       replace: true,
    //       transclude: true,
    //       restrict: 'A',
    //       scope: {},
    //       templateUrl: 'assets/templates/admin/sampleDirective.html'
    //     };
    //   }
    // );

}());