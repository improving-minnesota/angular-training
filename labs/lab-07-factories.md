# Lab Seven - Factories and Providers

&nbsp;
## Checkout the lab branch
```
git checkout lab-7-factories
git pull
```
&nbsp;
##### Start the grunt tasks: `karma:unit`, `watch:development`, and `grunt serve:development` in separate consoles.

&nbsp;
## Resources services
- Your teammates have already built a couple of services to make API calls to the server.
  - **api** and **data**
- We've been using them in our previous labs, so let's take a look at the code and see what they do.
- Open **client/src/app/resources.js** and review the code.

- Now that you've seen examples of registering a factory that you have already used, let's create one together.

&nbsp;
## Adding Security into the Application

### The Situation
- Our product owners are now concerned that anyone can access our application and want to have it secured by username and password.
  - They also want to make sure that the user can only see the timesheets that belong to them.


- After some deliberation, we've decided to use the `app` state's resolve block to protect the app.
  - Remember if a promise does not resolve, the state will not resolve.

### Create the Authorization Provider

- Great news!! Your teammates have already implemented the additional services needed to secure the application.
  - `securityContext` : This is a service that contains all of the logged in user's details.
  - `authentication` : This is a service that handles making API calls for logging in and logging out.
  - `retryQueue` : This remembers what was being attempted before the user is authenticated so that the application can return to that state after authentication.
  - `security.controllers` : The controller for the login form and logout button.


- We have been tasked with the actual authorization process to guard access to the application.
- Since the resolve block runs before dependency injection happens, we'll use a **Provider** so that we have access to it in our configuration block.

###### Register the module
- Open **client/src/security/services/authorization.js**
- Register the **authorization.services** module and specify dependencies on `security.services` and `authentication.services`.

```javascript
angular.module('authorization.services', [
  'security.services',
  'authentication.services'
])
```

###### Implement the provider
- Now we can supply our `authorization` recipe as a provider with these requirements:
  - A `requireAuthorizedUser` function that returns a promise that is only resolved when a user is successfully authenticated.
  - If a user does not successfully authenticate, we need to add the `requireAuthenticatedUser` function to the retry queue to ensure authentication happens before anything else on the queue.
  - If a user is successfully authenticated, let the promise resolve.

```javascript
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
          .then(function () {
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

- Ok, so let's look at what we just did:
  - We used the provider's `$get` function to set up our service and inject it's dependencies.
  - Since we could have a circular reference with `retryQueue`, we are using the `$injector` service to retrieve it.
  - Our service has 1 method: `requireAuthenticatedUser`
    - This returns a call to `authentication.requestCurrentUser()`, which returns a promise.
    - When that promise resolves, we check to see if the user is authenticated via the `securityContext`
    - If we are unauthenticated, we just push the `requireAuthenticatedUser` back on to the retry queue.
    - If the user is authenticated, we let `then()` block finish and the promise is resolved, which will allow the state transition to complete.
  - Lastly, we also include a property on our provider that returns a call to the `requireAuthenticatedUser` function.


###### Clear as mud?
- The actual implementation of the service isn't as important to remember as the fact that a provider needs to implement a `$get` function that returns the service implementation.

### Test the service

- To verify that our authorization service is working as expected, let's write some tests.
- Wait a minute!! Our wonderful teammates have already written some tests for us!!
- We just need to add our dependencies and inject our service under test.

###### Add dependencies
- Open **client/test/unit/security/services/authorization.spec.js**
- Find the `TODO` to add the authorization module as a depency and replace it with:

```javascript
'authorization.services',
```

###### Inject the service
- Locate the `TODO` to inject the authorization service and replace it with:

```javascript
authorization = $injector.get('authorization');
```

###### Run the tests
- Now run the tests via `grunt karma:unit`
- Did they all pass?

### Use your service to secure the application

- Let's use our new security services to secure the application and provide us with information about the logged in user so that we can use it to only show information that applies to them.

- The first thing we need to do is add some properties to scope so that we can bind to them in our templates.
- Let's `$watch` for changes to the `securityContext` and set these new properties.

###### Notify the application of changes
- Open **client/src/app/controllers.js**
- Locate the `TODO` near line #5 and watch for changes to `securityContext.authenticated`.
  - On a change, re-set `authenticated` and `loggedInUser` on scope.

```javascript
var vm = this;

$scope.$watch(function () {
  return securityContext.authenticated;
},
function (authenticated) {
  vm.authenticated = authenticated;
  vm.loggedInUser = securityContext.user;
});
```
- Since the `MainCtrl` controller is the top-most controller in the state hierarchy, its `$scope` properties will be available to all of the application controllers.
- Did you notice that your teammates have implemented a `logout()` function in the `NavCtrl` controller? More on that soon.

###### Hide the page title until successful authentication

- We don't want unauthorized users to see any of the application so let's hide elements until we are authenticated.
- Open **client/assets/templates/app/index.html**
- Add a `ng-if` directive to the title's wrapper on line #3:

```xml
<div ng-if="mainCtrl.authenticated" class="col-xs-12">
```
###### Secure the navigation bar

- Open **client/assets/templates/app/navbar.html**
- Let's make sure that the navigation buttons are hidden until successful authentication.
- Add a `ng-if` directive to the `<ul>` on line #9:

```xml
<ul ng-if="mainCtrl.authenticated" class="nav navbar-nav navbar-left">
```

- Now lets make sure that the button to navigate to the timesheets views are scoped to the logged in user:
- Find the `TODO` near line #17 and set the `ui-sref` to:

```xml
<a ui-sref="app.timesheets({user_id: mainCtrl.loggedInUser._id})">Timesheets</a>
```

- Lastly, we need a button to call that `logout` function that is living in the `NavCtrl`.
- Find the `TODO` near line #21 and add:

```xml
<ul class="nav navbar-nav navbar-right">
  <li>
    <a class="navbar-brand logout" ng-click="navCtrl.logout()">  
     <i class="fa fa-power-off"></i>
     Logout
    </a>
  </li>
</ul>
```

###### Add the authorization service to the login controller
- Open **client/src/security/controllers.js**
- Inject the `authorization` service in place of the `TODO`


###### Use the provider to guard the main application state

- Our final step to secure the application is to actually set up our provider in the resolve block of the `app` state declaration.
- Open **client/src/app/app.js** and locate the `TODO` near line #31.
- Add the below resolve to the state configuration.

```javascript
resolve: {
  authenticatedUser: authorizationProvider.requireAuthenticatedUser
}
```

### Run the application and test it out

- If you haven't already, start the application with `grunt serve:development` and `grunt watch:development` in separate consoles.
- Navigate to http://localhost:3000
- When prompted for login, login with :
```
  username: admin
  password: password
```
- Now checkout the timesheets page. Are there only timesheets for `admin`?
- Try logging out and logging back in with:
```
  username: user
  password: password
```
- Do you notice any differences?

&nbsp;
## Adding a Notifications Service

### The Situation
- Our wise and knowledgable product owners are concerned that we do not have any messages for the user to let them know what is happening in the application.
- As a result, we have been tasked with creating a notifications service to alert the users of successful and error actions.

### Build the Notifications Factory

- We've decided to use the very cool **Messenger.js** library to handle posting the messages to our views.
- We need to create a service to wrap the functionality of the `Messenger` global and eliminate duplicate code.
- Clean code === clean mind.

###### Implement the service
- Open **client/src/services/notifications.js**
- Add the following code:

```javascript
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
            angular.extend(message, config);
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
- Look over the code:
  - We have registered a module, `notifications.services`.
  - A *factory* named `notifications` has been added to the module.
  - The service has 4 methods: `message`, `error`, `success`, and `info`.


- To create an error notification, the api is :

```javascript
notifications.error('This is an error message');
```

- To create a success notification, the api is :

```javascript
notifications.success('This is a success message');
```
- Messenger also has several configuration options that you could include if you want. See the website for more info.

### Test the Notifications Service
- Now we just need to test our service to make sure that it works as expected before we use it in our application.
- Open **client/test/unit/services/notifications.spec.js**
- You'll notice that the **Jasmine** specification has been started for you by your teammates.

###### Test that the close button will be shown

- Find the `TODO` near line #28
- Add a test to check for a close button:
  - Create an empty object named, `message`.
  - Call the `message()` function on the `notifications` service with an empty message configuration object.
  - Verify that the message object has been extended with a `showCloseButton` property set to true.

```javascript
it('should set showCloseButton to true on the message', function () {
  var message = {};
  notifications.message(message, {});
  expect(message.showCloseButton).to.be.true;
});
```

###### Test the message object can be extended with a configuration

- Locate the `TODO` near line #34 and add the following test:
- Test the message object is extended with the configuration parameter.
  - Create an empty object named, `message`.
  - Call the `notifications` service `message()` function with the `message` object and an extra configuration.
  - Verify that the configuration's properties now exist on the `message` object.

```javascript
it('extend the message object with the passed in config', function () {
  var message = {};
  notifications.message(message, {config: true});
  expect(message.config).to.be.true;
});
```

###### Test we can post a message

- Locate the `TODO` near line #40 and add the following test:

- Using our `sinon` spies, test the `Messenger.post()` method is called with the extended configuration.
  - Call the `notifications.message()` function with a configured message object and extra configuration.
  - Verify that the `spies.post` was called.
  - Also verify that the `spies.post` was called with the expected configuration.

```javascript
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

###### Test posting an error message
- Locate the `TODO` near line #52 and add the following test:

- Test the `notifications.error` method creates the correct configuration.
  - Call the `notifications.error` method with an error message.
  - Verify that:
    - The message is set in the configuration.
    - The message `type` is 'error'.
    - The property, `showCloseButton` is set to true.
    - The `id` is set to 'error-message'.

```javascript
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

###### Test posting a success message
- Locate the `TODO` near line #64 and add the following test:

- Test the `notifications.success` method creates the expected configuration.
  - Call the `notifications.success()` method with a success message.
  - Verify that:
    - The `message` property is the success message.
    - The `type` property is set to 'success'.
    - The `showCloseButton` is set to true.
    - The configuration `id` is 'success-message'.

```javascript
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

###### Test posting an info message
- Locate the `TODO` near line #76 and add the following test:

- Test posting an info message creates the expected configuration.
  - Call the `notifications.info()` function with a message.
  - Verify that:
    - The message is the info message.
    - The `type` property is 'info'.
    - The 'showCloseButton' is set to true.
    - The message's `id` is 'info-message'.

```javascript
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
###### Run the tests
- Run your newly written tests via `grunt karma:unit`.
- Did they all pass?

### Using your service to show notifications

- Now let's add some notifications to the application!

###### Successful Login
- Open **client/src/security/services/authentication.js**

- Make sure that your notifications service is injected where needed!
- Add a success message to welcome the user back on successful login.

```javascript
notifications.success('Welcome back, ' + securityContext.user.username);
```

- Run the app and login, did you see your welcome message?

###### Employees

- Open **client/src/app/employees/controllers.js**
- Locate all of the `TODO`'s throughout the controllers and add success or error notifications where needed.
  - You are awesome, so this should be a piece of cake.


- Run the application and remove/restore/add employees and see your messages.

### Extra Credit

- Now add notifications for :
  - Projects controllers
  - Timesheet controllers
  - Timeunits controllers

&nbsp;
### Commit your changes to Git
```
git add .
git commit -m 'Security and Notifications for all the things.'
```
