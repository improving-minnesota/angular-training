(function () {
  'use strict';

  var logger = window.debug;

  angular.module('app.controllers', [])
    .controller('AppCtrl', 
      function ($scope, $state, $stateParams){
         logger.info('in app controller');

         logger.info($state.current.data);
      }
    )
    .controller('NavCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )
    .controller('TimesheetCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetDetailCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetEditCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimesheetCreateCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimeunitCtrl', 
      function ($scope, $state, $stateParams) {

      }
    )

    .controller('TimeunitDetailCtrl', 
      function ($scope, $state, $stateParams){

      }
    );

    logger.debug('Registered app.controllers');

}());