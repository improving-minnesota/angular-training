(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering navigation.topnav.directives");

  angular.module('navigation.topnav.directives', [])
    .directive('topnav', 
      function () {
        return {
          replace: true,
          restrict: 'A',
          controller: 'TopnavController',
          templateUrl: 'assets/templates/navigation/topnav/topnav.html'
        };
      }
    )

    .directive('quickviewTopnavItem', [
      '$compile',
      function ($compile) {
        return {
          replace: true,
          restrict: 'A',
          controller: 'TopnavQuickviewItemController',
          scope: true,
          templateUrl: 'assets/templates/navigation/topnav/quickviewItem.html',
          link : function (scope, element, attrs) {
          
            scope.$watch('selected', function(newValue) {
              if (newValue === scope.item.id && scope.quickviewOpen) {
                element.addClass('active');
              } else {
                element.removeClass('active');
              }
            }, true);

            $compile(element.contents())(scope);
          }
        };
      }]
    )

    .directive('linksTopnav', [
      '$compile', 
      function ($compile) {
        return {
          replace: true,
          restrict: 'A',
          controller: 'TopnavLinkItemController',
          scope: {
            item: '=',
            user: '='
          },
          templateUrl: 'assets/templates/navigation/topnav/linkTopnav.html',
          link : function (scope, element, attrs) {
            if (angular.isArray(scope.item.dropdown)) {
              element.html(
                '<a class="dropdown-toggle rez-nav-icon" data-toggle="dropdown">' + 
                  '<i class="icon-{{item.icon}} icon-2x"></i><i class="icon-chevron-down"></i>'+
                '</a>' + 
                '<div dropdown-topnav item="item" user="user"/>'
              );
            } else {
              element.html(
                '<a class="rez-nav-icon" ng-href="{{item.href}}">' +
                  '<i class="icon-{{item.icon}} icon-2x"></i>' +
                '</a>'
              );
            }

            // On click, trigger link item clicked in the controller
            // this will close the quickview if it is open. 
            element.on('click', function() {
              scope.$apply(function() {
                if (scope.linkItemClicked) {
                  scope.linkItemClicked();
                }
              });
            });

            $compile(element.contents())(scope);
          }
        };
      }]
    )

    .directive('dropdownTopnav', [
      '$compile', 
      'authentication',
      function ($compile, authentication) {
        return {
          replace: true,
          restrict: 'A',
          scope: {
            item: '=',
            user: '='
          },
          templateUrl: 'assets/templates/navigation/topnav/dropdownLink.html',
          link : function (scope, element, attrs) {

            scope.logout = function logout() {
              authentication.logout();
            };

            $compile(element.contents())(scope);
          }
        };
      }]
    );

}());
