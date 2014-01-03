(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.color.picker.directives");

  angular.module('common.color.picker.directives', [])
    .directive('colorPickerInputField', [
      '$compile',
      function ($compile) {
        return {
          replace: true,
          restrict: 'A',
          scope: {
            model: '=colorPickerInputField',
            label: '@colorPickerInputFieldLabel'
          },
          templateUrl: 'assets/templates/common/color.picker/colorPickerInputField.html',
          link: function (scope, element, attrs) {
            var button = element.find('a'),
              defaultLinkColor = jQuery.color('white'),
              colorPickerElement;

            scope.pickerShown = false;

            // Calculates the *perceived* brightness of the current color
            // and returns it (0,1)
            // http://en.wikipedia.org/wiki/Gamma_correction
            function gammaExpansion(color) {
              var gamma = 2.2;
              return 0.2126 * Math.pow(color.red(), gamma) +
                     0.7152 * Math.pow(color.green(), gamma) +
                     0.0722 * Math.pow(color.blue(), gamma);
            }

            //Update the button color to correspond to the model color
            scope.$watch('model', function(newValue) {
              var color = new jQuery.color.RGB(newValue[0], newValue[1], newValue[2]);
              button.css('background-color', color.css());
              if (gammaExpansion(color) > 0.5) {
                button.css('color', 'black');
              } else {
                button.css('color', 'white');
              }
            }, true);

            // Toggle whether the color picker is shown on button click
            button.bind('click', function() {
              scope.$apply(function() {
                scope.pickerShown = !scope.pickerShown;
              });
            });

            // Show or destroy the color picker based on pickerShown
            scope.$watch('pickerShown', function(newValue) {
              if (newValue) {
                colorPickerElement = $compile('<div color-picker-popover="model" color-picker-popover-shown="pickerShown" ' + 
                  'color-picker-popover-container=".rez-view-container>.container" color-picker-popover-target=".rez-color-picker-btn"></div>')(scope);
                element.find('.rez-color-picker-btn').parent().append(colorPickerElement);
                button.addClass("active");
              } else {
                if (colorPickerElement) colorPickerElement.remove();
                button.removeClass("active");
              }
            });
          }
        };
      }
    ])

    .directive('colorPickerPopover', [
      '$window',
      'colorPickerPopoverSingletonService',
      function ($window, colorPickerPopoverSingletonService) {
        return {
          replace: true,
          restrict: 'A',
          scope: {
            inputModel: '=colorPickerPopover',
            pickerShown: '=colorPickerPopoverShown',
            containerClass: '@colorPickerPopoverContainer',
            targetClass: '@colorPickerPopoverTarget',
          },
          templateUrl: 'assets/templates/common/color.picker/colorPickerPopover.html',
          link: function (scope, element, attrs) {
            var windowEl = angular.element($window),
              container = scope.containerClass ? angular.element(scope.containerClass) : angular.element('body'),
              parent = element.parent(),
              target = scope.targetClass ? parent.find(scope.targetClass) : parent,
              panel = element.find('.rez-color-picker-panel'),
              arrow = element.find('.rez-color-picker-popover-arrow');           

            scope.layoutPopover = function() {

              // Get element CSS properties (that vary based on media queries)
              var 
                elementMaxWidth = parseInt(element.css('max-width'), 10),
                elementPaddingLeft = parseInt(element.css('padding-left'), 10),
                elementMarginLeft = parseInt(element.css('margin-left'), 10);
                
              // Set the width of the element first, all other properties are calculated from the result of this
              element.css('width', container.innerWidth() > elementMaxWidth ? elementMaxWidth : container.innerWidth());

              // Cache properties needed for position calculation
              var
                elementWidth = element.width(),
                elementInnerWidth = element.innerWidth(),
                elementOuterWidth = element.outerWidth(),
                panelWidth = panel.width(),
                arrowHeight = 15,
                arrowTopPadding = 5,
                containerWidth = container.width(),
                containerInnerWidth = container.innerWidth(),
                containerOffsetLeft = container.offset().left,
                parentOffsetLeft = parent.offset().left,
                parentOffsetLeftRelativeToContainer = parentOffsetLeft - containerOffsetLeft,
                parentOffsetRightRelativeToContainer = containerWidth - parentOffsetLeftRelativeToContainer,
                targetOffsetLeft = target.offset().left,
                targetInnerWidth = target.innerWidth(),
                targetOuterHeight = target.outerHeight(true),
                targetOffsetLeftRelativeToContainer = targetOffsetLeft - containerOffsetLeft,
                targetOffsetRightRelativeToContainer = containerInnerWidth - targetOffsetLeftRelativeToContainer;


              // First Case
              // Popover has room to be centered at the target
              if (parentOffsetLeftRelativeToContainer >= elementMaxWidth / 2 && parentOffsetRightRelativeToContainer >= elementMaxWidth / 2) {
                arrow.css('left', ((elementInnerWidth) / 2) - elementPaddingLeft);
                element.css('left', -((panelWidth / 2) + elementMarginLeft - (targetInnerWidth / 2)));
                element.css('top', arrowHeight + targetOuterHeight + arrowTopPadding);

              // Second Case
              // Popover Takes the full width of the container
              } else if (containerInnerWidth === elementWidth) {
                var offsetRight = (elementWidth / 2) - targetOffsetRightRelativeToContainer;
                var offsetLeft = (elementWidth / 2) - targetOffsetLeftRelativeToContainer;
                var offset = 0;

                if (offsetRight > 0) {
                  offset += offsetRight;
                }
                if (offsetLeft > 0) {
                  offset -= offsetLeft;
                }

                arrow.css('left', ((elementOuterWidth) / 2) + (targetInnerWidth / 2) + offset - elementPaddingLeft);
                element.css('left', -((panelWidth / 2) + offset + elementMarginLeft));
                element.css('top', arrowHeight + targetOuterHeight + arrowTopPadding);

              // Third Case
              // Popover has room for max width but is offset on the left or right side
              } else if (parentOffsetRightRelativeToContainer < elementMaxWidth / 2 || parentOffsetLeftRelativeToContainer < elementMaxWidth / 2) {
                var additionalOffsetRight = (elementMaxWidth / 2) - targetOffsetRightRelativeToContainer;
                var additionalOffsetLeft = (elementMaxWidth / 2) - targetOffsetLeftRelativeToContainer;
                var additionalOffset = 0;

                if (additionalOffsetRight > 0) {
                  additionalOffset += additionalOffsetRight;
                }
                if (additionalOffsetLeft > 0) {
                  additionalOffset -= additionalOffsetLeft;
                }

                arrow.css('left', ((elementOuterWidth) / 2) + (targetInnerWidth / 2) + additionalOffset - elementPaddingLeft);
                element.css('left', -((panelWidth / 2) + additionalOffset + elementMarginLeft));
                element.css('top', arrowHeight + targetOuterHeight + arrowTopPadding);
              }
            };

            scope.layoutPopover();
        
            // Register a resize event to watch for window changes so we can reposition
            // the popover.
            var recalculateStyles = _.debounce(function() {
              scope.$apply(function() {
                scope.layoutPopover();
              });
            }, 50); // Debounce 50ms so we don't trigger too many redraws

            windowEl.on('resize.color-picker', function(event){
              recalculateStyles();
            });

            // When this element is being destroyed, remove the window resize listener
            element.on('$destroy', function() {
              windowEl.off('resize.color-picker');
            });

            // If a picker toggle was provided, set the value to false when the close button
            // is clicked.  The parent directive is responsible for destroying this directive.
            element.find('.close-color-picker').bind('click', function() {
              if (!_.isUndefined(scope.pickerShown)) {
                scope.$apply(function() {
                  scope.pickerShown = false;
                });
              }
            });
          }
        };
      }
    ])

    .directive('colorPicker', [
      function () {
        return {
          replace: true,
          restrict: 'A',
          controller: 'ColorPickerController',
          scope: {
            inputModel: '=colorPicker',
          },
          templateUrl: 'assets/templates/common/color.picker/colorPicker.html',
          link: function (scope, element, attrs, controller) {
            // Magic happens in the controller
          }
        };
      }
    ])

    .directive('colorPickerSwatch', [
      function () {
        return {
          replace: false,
          restrict: 'A',
          scope: {
            colorModel: '=colorPickerSwatch'
          },
          link: function (scope, element, attrs) {
            scope.$watch('colorModel', function(newValue) {
              var color = new jQuery.color.HSL(
                newValue.hue,
                newValue.saturation,
                newValue.lightness
              );
              element.css('background-color', color.css());
            }, true);
          }
        };
      }
    ])

    .directive('farbtastic', [
      function () {
        return {
          replace: false,
          restrict: 'A',
          controller: 'ColorWheelController',
          scope: {
            colorModel: '=farbtastic',
            hasFocus: '&hasFocus'
          },
          link: function (scope, element, attrs) {
            var farbtastic = $.farbtastic(element, function(event) {
              //Check to make sure this wasn't fired from a change in the farbtasticModel
              if (scope.farbtasticModel !== farbtastic.hsl) {
                scope.$apply(function() {
                  scope.farbtasticModel = farbtastic.hsl;
                });
              }  
            });

            if (!scope.colorModel) {
              scope.colorModel = {};
            }

            //Set the initial values
            if (!_.isUndefined(scope.colorModel.hue) && !_.isUndefined(scope.colorModel.saturation) && !_.isUndefined(scope.colorModel.lightness)) {
              scope.farbtasticModel = [
                scope.colorModel.hue,
                scope.colorModel.saturation,
                scope.colorModel.lightness
              ];
            } else {
              scope.farbtasticModel = [0, 1, 0.5];
            }

            farbtastic.setHSL(scope.farbtasticModel);

            scope.$watch('farbtasticModel', function(newValue, oldValue) {
              // This change came from fabrtastic
              if (farbtastic.hsl === newValue) {
                scope.hasFocus();
                scope.colorModel.hue = newValue[0];
                scope.colorModel.saturation = newValue[1];
                scope.colorModel.lightness = newValue[2];
              // Otherwise it came from elsewhere
              } else {
                farbtastic.setHSL(newValue);
              }
            });

            scope.$watch('colorModel', function(newValue, oldValue) {
              if (farbtastic.hsl !== [newValue.hue, newValue.saturation, newValue.lightness]) {
                scope.farbtasticModel = [
                  newValue.hue,
                  newValue.saturation,
                  newValue.lightness
                ];    
              }
            }, true);
          }
        };
      }
    ]);

}());
