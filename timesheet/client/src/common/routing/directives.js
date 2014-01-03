(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.routing.directives");

  angular.module('common.routing.directives', [])
    .directive('navigateToOnClick',[
      '$compile',
      '$location',
      function ($compile, $location) {
        return {
          replace: false,
          restrict: 'A',
          link : function (scope, element, attrs) {
            element.on('click', function() {
              $location.path(scope.$apply(attrs.navigateToOnClick));
              scope.$apply();
            });
            $compile(element.contents())(scope);
          }
        };
      }]
    );

}());
