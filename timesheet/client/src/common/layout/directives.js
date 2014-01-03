(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.layout.directives");

  angular.module('common.layout.directives', [])
    .directive('verticalCenterElement', [
      '$window',
      function ($window) {
        return {
          replace: true,
          restrict: 'A',
          scope: false,
          link: function (scope, element, attrs) {
            var windowEl = angular.element($window),
              containerEl = attrs.verticalCenterElement ? angular.element(attrs.verticalCenterElement) : element.parent();       

            scope.adjustVerticalMargin = function() {
              var containerHeight = containerEl.height(),
                elementHeight = element.height();
              if (containerHeight > elementHeight) {
                element.css('margin-top', (containerHeight - elementHeight) / 2);
              } else {
                element.css('margin-top', 0);
              }
              
            };

            scope.adjustVerticalMargin();
        
            // Register a resize event to watch for window changes so we can reposition
            // the popover.
            var recalculateStyles = _.debounce(function() {
              scope.$apply(function() {
                scope.adjustVerticalMargin();
              });
            }, 25); // Debounce 25ms so we don't trigger too many redraws

            windowEl.on('resize.veritcal-align', function(event){
              recalculateStyles();
            });

            windowEl.on('load.veritcal-align', function(event){
              recalculateStyles();
            });

            // When this element is being destroyed, remove the window resize listener
            element.on('$destroy', function() {
              windowEl.off('resize.veritcal-align');
              windowEl.off('load.veritcal-align');
            });
          }
        };
      }
    ])
    .directive('rezrPanelPopoverPositioner', [
      '$window',
      function ($window) {
        return {
          restrict: 'A',
          scope: {
            containerSelector: '@',
            targetSelector: '@',
            isOpen: '=rezrPanelPopoverPositionerIsOpen'
          },
          link: function (scope, element, attrs) {
            var windowEl = angular.element($window),
              container = scope.containerSelector ? angular.element(scope.containerSelector) : element.closest('.container'),
              parent = element.parent(),
              target = scope.targetSelector ? angular.element(scope.targetSelector) : parent,
              panel = element.find('.rez-panel-popover-panel'),
              panelBody = element.find('.panel-body'),
              arrow = element.find('.rez-panel-popover-arrow');           

            scope.layoutPopover = function() {

              // Get element CSS properties (that vary based on media queries)
              var 
                elementMaxWidth = panelBody.innerWidth(),
                elementPaddingLeft = parseInt(element.css('padding-left'), 10),
                elementMarginLeft = parseInt(element.css('margin-left'), 10);
                
              // Set the width of the element first, all other properties are calculated from the result of this
              //element.css('width', container.innerWidth() > elementMaxWidth ? elementMaxWidth : container.innerWidth());

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
                containerPadding = (container.innerWidth() - container.width()) / 2,
                containerOffsetLeft = container.offset().left,
                parentOffsetLeft = parent.offset().left,
                parentOffsetLeftRelativeToContainer = parentOffsetLeft - containerOffsetLeft,
                parentOffsetRightRelativeToContainer = containerWidth - parentOffsetLeftRelativeToContainer,
                targetOffsetLeft = target.offset().left,
                targetInnerWidth = target.innerWidth(),
                targetOuterHeight = target.outerHeight(true),
                targetOffsetLeftRelativeToContainer = (targetOffsetLeft - containerOffsetLeft) + (targetInnerWidth / 2),
                targetOffsetRightRelativeToContainer = containerInnerWidth - targetOffsetLeftRelativeToContainer;


              // First Case
              // Popover has room to be centered at the target
              if (targetOffsetLeftRelativeToContainer >= elementMaxWidth / 2 && targetOffsetRightRelativeToContainer >= elementMaxWidth / 2) {
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
              } else if (targetOffsetRightRelativeToContainer < elementMaxWidth / 2 || targetOffsetLeftRelativeToContainer < elementMaxWidth / 2) {
                var additionalOffsetRight = (elementMaxWidth / 2) - targetOffsetRightRelativeToContainer;
                var additionalOffsetLeft = (elementMaxWidth / 2) - targetOffsetLeftRelativeToContainer;
                var additionalOffset = 0;

                if (additionalOffsetRight > 0) {
                  additionalOffset += additionalOffsetRight;
                }
                if (additionalOffsetLeft > 0) {
                  additionalOffset -= additionalOffsetLeft;
                }

                arrow.css('left', ((elementOuterWidth) / 2) + additionalOffset - elementPaddingLeft + containerPadding);
                element.css('left', -((panelWidth / 2) + additionalOffset + elementMarginLeft - (targetInnerWidth / 2) + containerPadding));
                element.css('top', arrowHeight + targetOuterHeight + arrowTopPadding);
              }
            };

            // Register a resize event to watch for window changes so we can reposition
            // the popover.
            var recalculateStyles = _.debounce(function() {
              scope.$apply(function() {
                scope.layoutPopover();
              });
            }, 10); // Debounce 50ms so we don't trigger too many redraws

            windowEl.on('resize.panel-popover', function(event){
              recalculateStyles();
            });

            // When this element is being destroyed, remove the window resize listener
            element.on('$destroy', function() {
              windowEl.off('resize.panel-popover');
            });

            scope.$watch('isOpen', function(newValue) {
              if (newValue) {
                _.delay(function() {
                  scope.$apply(function() {
                    scope.layoutPopover();
                  });
                }, 10);
              }
            });
          }
        };
      }
    ]);
}());
