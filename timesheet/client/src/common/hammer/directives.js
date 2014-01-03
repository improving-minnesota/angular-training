(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.hammer.directives");

  angular.module('common.hammer.directives', [])
    .directive('swipeLeft', [
      '$parse',
      function ($parse) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            var fn = $parse(attrs.swipeLeft);
            var hammer = new Hammer(element[0]);
            hammer.on("swipeleft", function(event) {
              scope.$apply(function() {
                fn(scope, {$event:event});
              });
            });
          }
        };
      }
    ])
    .directive('swipeRight', [
      '$parse',
      function ($parse) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            var fn = $parse(attrs.swipeRight);
            var hammer = new Hammer(element[0]);
            hammer.on("swiperight", function(event) {
              scope.$apply(function() {
                fn(scope, {$event:event});
              });
            });
          }
        };
      }
    ]);
}());
