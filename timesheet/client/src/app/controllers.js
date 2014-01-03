(function () {
  'use strict';

  var logger = window.debug;

  angular.module('app.controllers', [])
    .controller('HomeController', [
      '$scope',
      function ($scope){
         
      }
    ])
    .controller('NavController', [
      '$scope',
      function ($scope) {

        $scope.dropdown = [
          {
            "text": 'option1',
            "href": '#/two/one'
          },

          {
            "text": 'option2',
            "href": '#/two/two'
          }
        ];
      }
    ]);

    logger.debug('Registered app.controllers');

}());