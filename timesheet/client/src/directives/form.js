(function () {
  'use strict';

  angular.module('form.directives', [])

    .directive('tszFormSectionHeader', function () {
      return {
        replace: true,
        transclude: true,
        scope: {
          header: '@'
        },
        templateUrl: 'assets/templates/common/form/form-header.html'
      };
    })

    .directive('tszFieldWrap', function ($compile) {
      return {
        transclude: true,
        restrict: 'A',
        templateUrl: 'assets/templates/common/form/fields/field-wrapper.html',
        scope : {
          inputId: "@",
          label: "@",
          labelCol: "@",
          fieldCol: "@"
        },
        link: function (scope, element) {

          scope.getLabelCol = function () {
            return scope.labelCol || "2";
          };

          scope.getFieldCol = function () {
            return scope.fieldCol || "4";
          };
        }
      };
    })

    .directive('tszStaticField', function () {
      return {
        replace: true,
        restrict: 'A',
        scope : {
          value: "@",
          id: "@id",
          label: "@",
          labelCol: "@",
          fieldCol: "@"
        },
        templateUrl: "assets/templates/common/form/fields/static-field.html",
        link: function (scope, element) {

          scope.getLabelCol = function () {
            return scope.labelCol || "2";
          };

          scope.getFieldCol = function () {
            return scope.fieldCol || "4";
          };
        }
      };
    })

    .directive('tszAfterDate', function () {
      return {
        replace: true,
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

          
        }
      };
    });

}());
