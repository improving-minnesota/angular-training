(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering rezr.directives");

  angular.module('rezr.directives', []);

  // Directives go here -----------

  // Example: 
    // .directive('sampleDirective', 
    //   function () {
    //     return {
    //       controller: RezrController,
    //       replace: true,
    //       transclude: true,
    //       restrict: 'A',
    //       scope: {},
    //       templateUrl: 'assets/templates/rezr/sampleDirective.html'
    //     };
    //   }
    // );

}());