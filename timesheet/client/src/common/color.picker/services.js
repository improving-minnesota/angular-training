(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering common.color.picker.services");

  angular.module('common.color.picker.services', [])
    .factory('colorPickerPopoverSingletonService', [
      function () {
        var colorPickerPopoverSingletonService = {};
          
        var popoverElement;

        colorPickerPopoverSingletonService.isPopoverOpen = function() {
          return _.isUndefined(popoverElement);
        };

        colorPickerPopoverSingletonService.openNewPopover = function(newPopoverElement) {
          if (popoverElement) {
            popoverElement.remove();
          }
          popoverElement = newPopoverElement;
        };

        colorPickerPopoverSingletonService.closePopover = function() {
          if (popoverElement) {
            popoverElement.remove();
          }
        };

        return colorPickerPopoverSingletonService;
      }
    ]);

}());
