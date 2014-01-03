(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.form.field.directives");

  var fieldScope = {
    model: "=ngModel",
    id: "@id",
    placeholder: "@",
    labelCol: "@",
    label: "@",
    fieldCol: "@",
    name: "@",
    isRequired: "@",
    minValid: "@",
    maxValid: "@",
    matchValid: "@"
  };

  var fieldLink = function (scope, element) {        
    scope.getPlaceholder = function () {
      return scope.placeholder || scope.label;
    };

    scope.getLabelCol = function () {
      return scope.labelCol || "2";
    };

    scope.getFieldCol = function () {
      return scope.fieldCol || "4";
    };

    scope.getName = function () {
      return scope.name || scope.id;
    };
  };

  angular.module('common.form.field.directives', [])

    .directive('tszFieldWrap', [
      '$compile',
      function ($compile) {
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
      }]
    )

    .directive('tszDatepickerPopup', [
      '$compile',
      '$parse',
      '$document',
      'dateFilter',
      'datepickerPopupConfig',
      function ($compile, $parse, $document, dateFilter, datepickerPopupConfig) {
        return {
          restrict: 'EA',
          require: '?ngModel',
          link: function(originalScope, element, attrs, ngModel) {
            var closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection;
            var dateFormat = attrs.tszDatepickerPopup || datepickerPopupConfig.dateFormat;

            // create a child scope for the datepicker directive so we are not polluting original scope
            var scope = originalScope.$new();
            originalScope.$on('$destroy', function() {
              scope.$destroy();
            });

            // Control whether or not the date picker is open
            scope.isOpen = getIsOpen ? getIsOpen(originalScope) : false; // Initial state

            var getIsOpen, setIsOpen;
            if ( attrs.isOpen ) {
              getIsOpen = $parse(attrs.isOpen);
              setIsOpen = getIsOpen.assign;

              originalScope.$watch(getIsOpen, function updateOpen(value) {
                scope.isOpen = !! value;
              });
            }
            
            function setOpen( value ) {
              if (setIsOpen) {
                setIsOpen(originalScope, !!value);
              } else {
                scope.isOpen = !!value;
              }
            }

            var documentClickBind = function(event) {
              if (scope.isOpen && event.target !== element[0]) {
                scope.$apply(function() {
                  setOpen(false);
                });
              }
            };

            var elementFocusBind = function() {
              scope.$apply(function() {
                setOpen( true );
              });
            };

            var documentBindingInitialized = false, elementFocusInitialized = false;
            scope.$watch('isOpen', function(value) {
              if (value) {
                $document.bind('click', documentClickBind);
                if(elementFocusInitialized) {
                  element.unbind('focus', elementFocusBind);
                }
                element[0].focus();
                documentBindingInitialized = true;
              } else {
                if(documentBindingInitialized) {
                  $document.unbind('click', documentClickBind);
                }
                element.bind('focus', elementFocusBind);
                elementFocusInitialized = true;
              }

              if ( setIsOpen ) {
                setIsOpen(originalScope, value);
              }
            });

            // popup element used to display calendar
            var popupEl = angular.element('<datepicker-popup-wrap><datepicker></datepicker></datepicker-popup-wrap>');
            popupEl.attr({
              'ng-model': 'date',
              'ng-change': 'dateSelection()'
            });
            var datepickerEl = popupEl.find('datepicker');
            if (attrs.datepickerOptions) {
              datepickerEl.attr(angular.extend({}, originalScope.$eval(attrs.datepickerOptions)));
            }

            // Watch for configuration changes
            function addWatchableAttribute(attribute, scopeProperty, datepickerAttribute) {
              if (attribute) {
                originalScope.$watch($parse(attribute), function(value){
                  scope[scopeProperty] = value;
                });
                datepickerEl.attr(datepickerAttribute || scopeProperty, scopeProperty);
              }
            }
            addWatchableAttribute(attrs.min, 'min');
            addWatchableAttribute(attrs.max, 'max');
            if (attrs.showWeeks) {
              addWatchableAttribute(attrs.showWeeks, 'showWeeks', 'show-weeks');
            } else {
              scope.showWeeks = true;
              datepickerEl.attr('show-weeks', 'showWeeks');
            }
            if (attrs.dateDisabled) {
              datepickerEl.attr('date-disabled', attrs.dateDisabled);
            }

            // Date parser.  This section needs some love
            // Need to remove the hard coded formats
            ngModel.$parsers.unshift(function(data) {
              if (_.isUndefined(data) || data === null) {
                ngModel.$setValidity('date', true);
                return null;

              } else if (angular.isDate(data)) {
                ngModel.$setValidity('date', true);
                return moment(data).format('YYYY-MM-DD');

              } else if (angular.isString(data)) {
                var momentDate = moment(data, 'MM/DD/YYYY');

                if (momentDate.isValid() && momentDate.isAfter('1900-01-01')) {
                  ngModel.$setValidity('date', true);
                  return momentDate.format('YYYY-MM-DD');
                } else if (data === "") {
                  ngModel.$setValidity('date', true);
                  return null;
                } else {
                  ngModel.$setValidity('date', false);
                  return null;
                }

              } else {
                ngModel.$setValidity('date', false);
                return null;
              }
            });

            //formatter
            ngModel.$formatters.push(function(data) {
              if (data === null) {
                return null;
              } else {
                return moment(data, "YYYY-MM-DD").toDate();
              }
            });

            // Change from field
            ngModel.$render = function() {
              logger.debug('here2');
              var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
              element.val(date);
              updateDatepicker();
            };

            // Change from date picker
            scope.dateSelection = function() {
              ngModel.$setViewValue(scope.date);
              ngModel.$render();
              var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
              element.val(date);
              updateDatepicker();

              if (closeOnDateSelection) {
                setOpen( false );
              }
            };

            function updateDatepicker() {
              scope.date = ngModel.$viewValue;
            }

            element.bind('input change keyup', function() {
              scope.$apply(function() {
                if (ngModel.$valid) {
                  updateDatepicker();
                }
              });
            });

            element.after($compile(popupEl)(scope));
          }
        };
      }
    ])

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
    });

}());
