(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering navigation.sidenav.directives");

  angular.module('navigation.sidenav.directives', [])
    .directive('sidenav', 
      function () {
        return {
          replace: true,
          scope: {
            items: '='
          },
          templateUrl: 'assets/templates/navigation/sidenav/sidenav.html',
          controller: 'SidenavController'
        };
      }
    )

    .directive('sidenavCollection', 
      function () {
        return {
          replace: true,
          scope: {
            items: '=',
            target: '=',
            open: '=',
            state: '='
          },
          templateUrl: 'assets/templates/navigation/sidenav/collection.html',
          controller: 'SidenavCollectionController'
        };
      }
    )
    
    .directive('sidenavItem',[ 
      '$compile',
      function ($compile) {
        return {
          replace: true,
          scope: {
            item: '='
          },
          controller : 'SidenavItemController',
          templateUrl: 'assets/templates/navigation/sidenav/item.html',
          link : function (scope, element, attrs) {
            var item = scope.item;

            // Add the icon to the link
            if (angular.isString(item.icon)) {
              var icon = angular.element("<i class='icon-{{item.icon}} icon-fixed-width'></i>");
              element.find('a').prepend(icon);
            }

            // Create the sub menu if it exists
            if (angular.isArray(item.subitems)) {
              
              scope.open = false;

              // add the collapsable functionality
              element.find('a').on('click', function () {
                scope.$apply(function () {
                  scope.open = !scope.open;
                });
              });

              // append the sub menu items
              element.append("<div class='sub-item-list' sidenav-collection items='item.subitems' target='item.target' open='open' state='item.state'/> ");
            }

            $compile(element.contents())(scope);
          }
        };
      }]
    );

}());
