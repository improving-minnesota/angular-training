/*global Messenger window */

(function() {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering app.services");

  angular.module('app.services', [])
    .factory('notifications', 
      function () {

        Messenger.options = {
          extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
          theme: 'air'
        };

        return {

          displayMessage : function (message, config) {
            message.showCloseButton = true;

            if (angular.isDefined(config) && angular.isObject(config)) {
              message = angular.extend(message, config);
            }

            // types : success, error, info
            new Messenger().post(message);
          }
        };
      });
}());