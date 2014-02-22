(function () {
  'use strict';

  angular.module('navigation.pagination.directives', [])

    .directive('tszPagination',
      function () {
        return {
          replace: true,
          restrict: 'A',
          scope: {
            pagination: '=',
            requestPage: '='
          },
          templateUrl: 'assets/templates/navigation/pagination/pagination.html',
          controller: 'paginationCtrl'
        };
      }
    )

    .directive('tszPaginationItem',
      function () {
        return {
          replace: false,
          transclude: true,
          restrict: 'A',
          controller : 'paginationItemCtrl',
          scope: {
            pagination: '=',
            pageNumber: '=',
            requestPage: '='
          },
          template: '<a ng-transclude></a>'
        };
      }
    );

}());
