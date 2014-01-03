(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.form.directives");

  angular.module('common.form.directives', [])

    .directive('tszFormSectionHeader', function() {
      return {
        replace: true,
        transclude: true,
        scope: {
          header: '@'
        },
        templateUrl: 'assets/templates/common/form/form-header.html'
      };
    });

}());
