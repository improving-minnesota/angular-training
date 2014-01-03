(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.form.directives");

  angular.module('common.form.directives', [])
    .directive('toggleButton', [
      '$parse',
      '$timeout',
      function ($parse, $timeout) {
        return {
          restrict: 'A',
          require: '?ngModel',
          link: function postLink(scope, element, attrs, controller) {
            element.on('click', function() {
              scope.$apply(function () {
                controller.$setViewValue(!controller.$modelValue);
              });
              scope.$digest();
            });
            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
              if (newValue) {
                element.addClass('rez-btn-toggled');
              } else {
                element.removeClass('rez-btn-toggled');
              }
            });
          }
        };
      }
    ])

    .directive('fieldInheritancePopover', [
      '$compile',
      '$http',
      '$templateCache',
      function ($compile, $http, $templateCache) {
        return {
          replace: true,
          restrict: 'A',
          scope: {
            inheritanceModel: '=inheritanceModel'
          },
          templateUrl: 'assets/templates/common/form/templateInheritance.html',
          link: function postLink(scope, element, attrs) {

            var popoverContent = '';

            //Get the popover template
            $http.get('assets/templates/common/form/templateInheritancePopover.html', {cache: $templateCache}).success(function(html) {
              popoverContent = html;

            //Then
            }).then(function() {

              //Compile the template with the current scope
              var compiledPopoverContent = $compile(popoverContent)(scope);

              //Render the bootstrap popover
              element.popover({
                trigger: 'hover',
                placement: 'left',
                container: 'body',
                title: 'Field Inheritance',
                html: true,
                content: compiledPopoverContent
              });
            });

            scope.$on('$destroy', function() {
              element.popover('destroy');
            });
          }
        };
      }
    ])

    .directive('focusMe', function() {
      return {
        link: function(scope, element) {
          scope.$watch('trigger', function(value) {
            if(value === 'true') { 
              element.focus(); 
            }
          });
        }
      };
    })

    .directive('rezrFormSectionHeader', function() {
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
