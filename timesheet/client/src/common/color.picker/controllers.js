(function () {
  'use strict';

  var logger = window.debug;

  angular.module('common.color.picker.controllers', [])
    .controller('ColorPickerController', [
      '$scope',
      function ($scope) {
        $scope.color = {
          hsl: {},
          rgb: {},
          cmyk: {},
          wheel: {}
        };

        $scope.initalizeModels = function() {
          // Set the default color to that of the model or create a new model
          var newColor;
          if (_.isArray($scope.inputModel) && $scope.inputModel.length === 3) {
            newColor = new jQuery.color.RGB(
              $scope.inputModel[0],
              $scope.inputModel[1],
              $scope.inputModel[2]
            );
          } else {
            newColor = new jQuery.color.RGB(1,0,0);
          }
          
          $scope.updateColorSpaceInputs(newColor);
          $scope.updateWheelValues(newColor);
        };

        $scope.setControlFocus = function(control) {
          $scope.focusedElement = control;
        };

        $scope.updateColorSpaceInputs = function(colorObj) {
          var rgbColor = colorObj.rgb();
          $scope.color.rgb.red = Math.round(rgbColor.red() * 255);
          $scope.color.rgb.green = Math.round(rgbColor.green() * 255);
          $scope.color.rgb.blue = Math.round(rgbColor.blue() * 255);
          $scope.color.hex = rgbColor.hex();

          var hslColor = colorObj.hsl();
          $scope.color.hsl.hue = Math.round(hslColor.hue() * 360);
          $scope.color.hsl.saturation = Math.round(hslColor.saturation() * 100);
          $scope.color.hsl.lightness = Math.round(hslColor.lightness() * 100);

          var cmykColor = colorObj.cmyk();
          $scope.color.cmyk.cyan = Math.round(colorObj.cyan() * 100);
          $scope.color.cmyk.magenta = Math.round(colorObj.magenta() * 100);
          $scope.color.cmyk.yellow = Math.round(colorObj.yellow() * 100);
          $scope.color.cmyk.black = Math.round(colorObj.black() * 100);
        };

        $scope.updateWheelValues = function(colorObj) {
          var hslColor = colorObj.hsl();
          $scope.color.wheel.hue = hslColor.hue();
          $scope.color.wheel.saturation = hslColor.saturation();
          $scope.color.wheel.lightness = hslColor.lightness();
        };

        $scope.updateInputModel = function(colorObj) {
          var rgbColor = colorObj.rgb();
          $scope.inputModel[0] = rgbColor.red();
          $scope.inputModel[1] = rgbColor.green();
          $scope.inputModel[2] = rgbColor.blue();
        };

        // Update the input values when the wheel is changed
        $scope.$watch('color.wheel', function(newValue) {
          if ($scope.focusedElement !== 'wheel') return;
          var newColor = new jQuery.color.HSL(
            newValue.hue,
            newValue.saturation,
            newValue.lightness
          );
          $scope.updateColorSpaceInputs(newColor);
          $scope.updateInputModel(newColor);
        }, true);

        $scope.$watch('color.rgb', function(newValue) {
          if ($scope.focusedElement !== 'rgb') return;
          if (newValue.red === null || newValue.green === null || newValue.blue === null) return; 
          
          var newColor = new jQuery.color.RGB(
            $scope.color.rgb.red / 255,
            $scope.color.rgb.green / 255,
            $scope.color.rgb.blue / 255
          );
          
          $scope.updateColorSpaceInputs(newColor);
          $scope.updateWheelValues(newColor);
          $scope.updateInputModel(newColor);
        }, true);

        $scope.$watch('color.hex', function(newValue) {
          if ($scope.focusedElement !== 'hex') return;
          if (newValue === null || !/^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(newValue)) return; 
          
          var newColor = new jQuery.color($scope.color.hex);
          
          $scope.updateColorSpaceInputs(newColor);
          $scope.updateWheelValues(newColor);
          $scope.updateInputModel(newColor);
        }, true);

        $scope.$watch('color.hsl', function(newValue) {
          if ($scope.focusedElement !== 'hsl') return;
          if (newValue.hue === null || newValue.saturation === null  || newValue.lightness === null) return;
          var newColor = new jQuery.color.HSL(
            $scope.color.hsl.hue / 360,
            $scope.color.hsl.saturation / 100,
            $scope.color.hsl.lightness / 100
          );
          
          $scope.updateColorSpaceInputs(newColor);
          $scope.updateWheelValues(newColor);
          $scope.updateInputModel(newColor);
        }, true);

        $scope.$watch('color.cmyk', function(newValue) {
          if ($scope.focusedElement !== 'cmyk') return;
          if (newValue.cyan === null || newValue.magenta === null || newValue.yellow === null || newValue.black === null) return;

          var newColor = new jQuery.color.CMYK(
            $scope.color.cmyk.cyan / 100,
            $scope.color.cmyk.magenta / 100,
            $scope.color.cmyk.yellow / 100,
            $scope.color.cmyk.black / 100
          );

          $scope.updateColorSpaceInputs(newColor);
          $scope.updateWheelValues(newColor);
          $scope.updateInputModel(newColor);
        }, true);

        $scope.initalizeModels();
      }
    ])

    .controller('ColorWheelController', [
      '$scope',
      function ($scope) {

      }
    ]);
}());
