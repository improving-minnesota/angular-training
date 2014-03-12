### timesheet/client/assets/templates/app/index.html

* line 3

```html
<div ng-if="authenticated" class="col-xs-12">
```

### timesheet/client/assets/templates/app/navbar.html

* line 9

```html
<ul ng-if="authenticated" class="nav navbar-nav navbar-left">
```

* line 17

```html
<a ui-sref="app.timesheets({user_id: loggedInUser._id})">Timesheets</a>
```

* line 21

```html
<ul class="nav navbar-nav navbar-right">
  <li>
    <a class="navbar-brand logout" ng-click="logout()">  
     <i class="fa fa-power-off"></i>
     Logout
    </a>
  </li>
</ul>
```

### timesheet/client/src/app/app.js

* line 31

```JavaScript
resolve: {
  authenticatedUser: authorizationProvider.requireAuthenticatedUser
}
```

### timesheet/client/src/app/controllers.js

* line 5

```JavaScript
$scope.$watch(function () {
  return securityContext.authenticated;
},
function (authenticated) {
  $scope.authenticated = authenticated;
  $scope.loggedInUser = securityContext.user;
});
```

### timesheet/client/src/app/employees/controllers.js

notifications service and success/error calls

### timesheet/client/src/app/projects/controllers.js

notifications service and success/error calls

### timesheet/client/src/app/timesheets/controllers.js

notifications service and success/error calls

### timesheet/client/src/app/timesheets/timeunits/controllers.js

notifications service and success/error calls

### timesheet/client/src/security/controllers.js

inject the authorization service

### timesheet/client/src/security/services/authentication.js

notifications service and success message

### timesheet/client/src/security/services/authorization.js

```JavaScript
angular.module('authorization.services', [
  'security.services',
  'authentication.services'
])

.provider('authorization', {

  requireAuthenticatedUser: [
    'authorization',
    function (authorization) {
      return authorization.requireAuthenticatedUser();
    }
  ],

  $get: function ($injector, authentication, securityContext) {

    var service = {
      requireAuthenticatedUser: function () {
        var queue = $injector.get('retryQueue');

        return authentication.requestCurrentUser()
          .then(function (userInfo) {
            if ( !securityContext.authenticated ) {
              return queue.pushRetryFn('unauthenticated-client', function () {
                return service.requireAuthenticatedUser();
              });
            }
          });
      }
    };
    return service;
  }
});
```

### timesheet/client/src/services/notifications.js

```JavaScript
angular.module('notifications.services', [])
  .factory('notifications',
    function () {

      Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
        theme: 'flat'
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
          notifications.message({message: message, type: 'error', id: 'error-message'}, config);
        },

        success : function (message, config) {
          notifications.message({message: message, type: 'success', id: 'success-message'}, config);
        },

        info: function (message, config) {
          notifications.message({message: message, type: 'info', id: 'info-message'}, config);
        }
      };

      return notifications;
    });
```

### timesheet/client/test/unit/app/controllers.spec.js

inject notifications

### timesheet/client/test/unit/app/employees/controllers.spec.js
### timesheet/client/test/unit/app/projects/controllers.spec.js

* line 22

```JavaScript
'notifications.services',
```

* line 37

```JavaScript
var notifications = $injector.get('notifications');
```

* line 40

```JavaScript
error: sinon.spy(notifications, 'error'),
success: sinon.spy(notifications, 'success'),
```

* line 99

```JavaScript
expect(spies.error).to.have.been.called;
```

* success notification

```JavaScript
expect(spies.success).to.have.been.called;
expect(spies.error).to.not.have.been.called;
```

* error notification

```JavaScript
expect(spies.error).to.have.been.called;
expect(spies.success).to.not.have.been.called;
```

### timesheet/client/test/unit/security/services/authentication.spec.js

add notifications as a dependency

### timesheet/client/test/unit/security/services/authorization.spec.js

adding services (notifications, authorization) as dependencies
using $injector to inject authorization service

### timesheet/client/test/unit/services/notifications.spec.js

* line 28

```JavaScript
it('should set showCloseButton to true on the message', function () {
  var message = {};
  notifications.message(message, {});
  expect(message.showCloseButton).to.be.true;
});
```

* line 34

```JavaScript
it('extend the message object with the passed in config', function () {
  var message = {};
  notifications.message(message, {config: true});
  expect(message.config).to.be.true;
});
```

* line 40

```JavaScript
it('should post the message via Messenger', function () {
  notifications.message({message: 'allo'}, {config: true});
  expect(spies.post).to.have.been.called;
  expect(spies.post).to.have.been.calledWith({
    message: 'allo',
    config: true,
    showCloseButton: true
  });
});
```

* line 52

```JavaScript
it('should post an error message', function () {
  notifications.error('oh noze');
  expect(spies.post).to.have.been.calledWith({
    message: 'oh noze',
    type: 'error',
    showCloseButton: true,
    id: 'error-message'
  });
});
```

* line 64

```JavaScript
it('should post a success message', function () {
  notifications.success('i can haz');
  expect(spies.post).to.have.been.calledWith({
    message: 'i can haz',
    type: 'success',
    showCloseButton: true,
    id: 'success-message'
  });
});
```

* line 76

```JavaScript
it('should post an info message', function () {
  notifications.info('info');
  expect(spies.post).to.have.been.calledWith({
    message: 'info',
    type: 'info',
    showCloseButton: true,
    id: 'info-message'
  });
});
```


hello
