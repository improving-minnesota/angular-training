/*global Messenger window */

(function () {
  'use strict';

  angular.module('app.services', [])
    .factory('notifications', 
      function () {

        Messenger.options = {
          extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
          theme: 'air'
        };

        var notifications = {

          message : function (message, config) {
            message.showCloseButton = true;

            if (angular.isDefined(config) && angular.isObject(config)) {
              message = angular.extend(message, config);
            }

            // types : success, error, info
            new Messenger().post(message);
          },

          error : function (message, config) {
            notifications.message({message: message, type: 'error'}, config);
          },

          success : function (message, config) {
            notifications.message({message: message, type: 'success'}, config);
          },

          info: function (message, config) {
            notifications.message({message: message, type: 'info'}, config);
          }
        };

        return notifications;
      });
}());