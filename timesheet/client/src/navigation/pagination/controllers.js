(function () {
  'use strict';

  var logger = window.debug;

  angular.module('navigation.pagination.controllers', ['ui.router'])

    .controller('paginationController', [
      '$scope',
      '$element',
      '$state',
      'paginationService',
      function ($scope, $element, $state, paginationService) {

        $scope.pagination = {
          page : {
            number: 0
          }
        };

        $scope.$watch('pagination.page', function () {
          $scope.pagination.pageNumbers = $scope.getPageNumbers();
        }, true);

        $scope.getPageNumbers = function () {
          var pageNumbers = [];

          for (var i = 0; i < $scope.pagination.page.totalPages; i+=1) {
            pageNumbers.push(i);
          }

          return pageNumbers;
        };

        $scope.hasPages = function () {
          return $scope.getPageNumbers().length > 0;
        };

        $scope.pager = {
          previousPage : function () {
            var number = $scope.pagination.page.number;

            if (number > 0) {
              $scope.pagination.page.number = number - 1;
            }
            $scope.requestPage($scope.pagination.page.number);
          },

          nextPage : function () {
            var number = $scope.pagination.page.number;

            if (number < $scope.pagination.page.totalPages - 1) {
              $scope.pagination.page.number = number + 1;
            }
            $scope.requestPage($scope.pagination.page.number);
          },

          lastPage : function () {
            $scope.pagination.page.number = $scope.pagination.page.totalPages - 1;
            $scope.requestPage($scope.pagination.page.number);
          },

          firstPage : function () {
            $scope.pagination.page.number = 0;
            $scope.requestPage($scope.pagination.page.number);
          }
        };
      }
    ])

    .controller('paginationItemController', [
      '$scope',
      '$element',
      '$state',
      function ($scope, $element, $state) {

        $element.on('click', function (e) {
          $scope.$apply(function () {
            $scope.pagination.page.number = $scope.pageNumber;
            
            $scope.requestPage($scope.pageNumber);
          });
        });

        $scope.showMe = function () {
          var pageNumber = $scope.pageNumber,
            lastPage = $scope.pagination.page.totalPages;

          // show all page numbers if there are less than 6
          if (lastPage < 6) {
            return true;
          }

          // if the current page is lower than 3
          else if (number < 3) {
            return pageNumber > 0 && pageNumber < 6;
          }

          // show the ending page numbers 
          else if (lastPage < (number + 2)) {
            return pageNumber > (lastPage - 5);
          }

          else {
            return pageNumber < (number - 2) || pageNumber > (number + 2);
          }
        };
      }
    ]);

    logger.debug('Registered navigation.pagination.controllers');

}());
