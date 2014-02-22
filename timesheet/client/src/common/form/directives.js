(function () {
  'use strict';

  angular.module('common.form.directives', [])

    .directive('tszFormSectionHeader', function () {
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
