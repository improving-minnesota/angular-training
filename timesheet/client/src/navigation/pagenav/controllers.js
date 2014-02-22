(function () {
  'use strict';

  angular.module('navigation.pagenav.controllers', [])

    .controller('PagenavItemCtrl', function ($scope, $element, $state) {
      $element.on('click', function (e) {
        $scope.$apply(function () {
          $state.go($scope.item.state, $scope.item.stateParams);
        });
      });

      $scope.$watch(function () {
          return $state.current;
        },
        function () {
          if ($state.is($scope.item.state)) {
            $element.addClass('active');
          }
          else {
            $element.removeClass('active');
          }
        });
      }
    );
    
}());
