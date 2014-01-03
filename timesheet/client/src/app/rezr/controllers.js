(function () {
  'use strict';

  var logger = window.debug;

  angular.module('rezr.controllers', [
    'ui.calendar'
  ])
    .controller('RezrController', [
      '$scope',
      function ($scope) {
        
         
      }
    ])

    .controller('RezrDashboardController', [
      '$scope',
      '$control',
      function ($scope, $control) {
        $scope.reservation = {
          startDate: null,
          endDate: null
        };

        $scope.reservationEvents = [];
        $scope.events = [];

        $scope.getReservations = function (page) {
          $control.getAll('reservation', page).then(function (reservations) {
            logger.debug(reservations);
            angular.forEach(reservations, function(reservation) {
              $scope.events.push({title: 'Reserved',start: moment(reservation.startDate).toDate(), end: moment(reservation.endDate).toDate()});
            });

          });
        };

        $scope.getReservations();

        $scope.eventSources = [$scope.events];

        $scope.uiConfig = {
          calendar:{
            editable: false,
            header:{
              left: '',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };
         
      }
    ])


    .controller('RezrTimeslotsController', [
      '$scope',
      '$control',
      function ($scope, $control) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.reservation = {
          startDate: null,
          endDate: null
        };

        $scope.reservationEvents = [];
        $scope.events = [];

        $scope.$watch('reservation', function() {
          var startDate = null,
            endDate = null;


          if ($scope.reservation.startDate) {
            startDate = moment($scope.reservation.startDate, "YYYY-MM-DD").toDate();
          }

          if ($scope.reservation.endDate) {
            endDate = moment($scope.reservation.endDate, "YYYY-MM-DD").toDate();
          } else {
            endDate = startDate;
          }

          // Clear the reservation array
          for(var i = 0; i < $scope.reservationEvents.length; i++){
            $scope.reservationEvents.shift();
          }

          // Push the new Reservation
          $scope.reservationEvents.push(
            {
              title: 'My Reservation',
              start: startDate,
              end: endDate,
              borderColor: '#777',
              backgroundColor: '#777'
            }
          );
        }, true);

        $scope.getReservations = function (page) {
          $control.getAll('reservation', page).then(function (reservations) {
            logger.debug(reservations);
            angular.forEach(reservations, function(reservation) {
              $scope.events.push({title: 'Reserved',start: moment(reservation.startDate).toDate(), end: moment(reservation.endDate).toDate()});
            });

          });
        };

        $scope.getReservations();

        $scope.eventSources = [$scope.events, $scope.reservationEvents];

        $scope.uiConfig = {
          calendar:{
            editable: false,
            header:{
              left: '',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };

      }
    ])

    .controller('RezrAdminController', [
      '$scope',
      function ($scope) {
        
      }
    ]);

  logger.debug('Registered rezr.RezrController');

}());