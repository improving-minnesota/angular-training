# Lab Two - Angular Basics

## Checkout the Lab Branch
- In a console:

```
git checkout lab-2-angular
```
&nbsp;
## Review index.jade

- Open **api/app/views/application/index.jade**
- Let's review this together:
  - First notice that the design team has laid out the application with a *Bootstrap* navbar and a main content section.
  - `ng-app` directive is in the `<html>` tag.
    - This tells Angular to boot itself up.
  - `<body>` tag has a `ng-controller` directive specifying that "MainCtrl" is the controller for that element and its children.
  - The directive, `ng-view` is inside the main content section. That is where Angular will insert the templates.

&nbsp;
## Create Main.js

- The `ng-app` directive specifies that the application module is named 'main'.
- Let's create that main module now.
- Open **client/src/main.js**


- Add the below code which will:
  - Register the `main` module.
  - Add the compiled templates from our `Grunt` build as dependencies.
  - Add the `app` module as a dependency. (We'll create that in a minute)
  - Use the `$log` service to notify us that the application is running via the browser's javascript console.


```javascript
angular.module('main', [
  'templates-main',
  'templates-lib',
  'app'
])

.run(function ($log) {
  $log.info("Application running.");
});
```

&nbsp;
## Create Application Controllers

- Now we need to create our application's controllers.
- Open **client/src/app/controllers.js**

- Add the below code to register the `app.controllers` module and create our controllers:

```javascript
angular.module('app.controllers', [])

  .controller('MainCtrl', function ($scope) {

  })

  .controller('AppCtrl',
    function ($scope){
      $scope.demo = {};
    }
  )

  .controller('NavCtrl',
    function ($scope) {

    }
  );
```

&nbsp;
## Run the Application
- Run the application via :

```
grunt runapp:development
```

```
grunt watch:development
```

- .. in two separate console windows.

- Navigate to http://localhost:3000/#/home
- What do you see?
- Try typing in either of the input boxes.


- Do you wonder how that is happening?
  - Open **client/assets/templates/index.html** and look at the model binding in the template.
  - You'll have many more chances to take advantage of this during the next few days.


### Congratulations on creating your first Angular application. You are now ready to take on the world!!
- Too much?
