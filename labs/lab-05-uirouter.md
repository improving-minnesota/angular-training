# Lab Five - Navigation with UI Router

&nbsp;
## Checkout the Lab Branch
- In your console:

```
git checkout lab-5-uirouter
```

&nbsp;
## Start the Grunt Tasks
```
grunt karma:unit
```

```
grunt watch:development
```

```
grunt runapp:development
```

&nbsp;
## Application States and Review

### Review main.js and state set up
- Before we get started let's see what our teammates have already done for us.
- Open **main.js** or just look below:

```javascript
.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise("/app/projects");
})

.run(function ($log, $state, $rootScope, $stateParams) {
  // putting state into $rootScope so that these services are available in views
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $log.info("Application running.");
});
```
- What is happening here?
  - We are using the `$urlRouterProvider` to default any unmatched urls to */app/projects*
    - More on this url later.
  - In our main module's `run()` block, we are assigning the `$state` and `$stateParams` as properties on `$rootScope`.
    - This allows us to use these services in our views, without having to manually add them to scope in the controllers.

### Add the directive to our app index

- We now need to tell *UI Router* where to place the content of our states.
- Open **client/assets/templates/app/index.html**
- Locate the `TODO` near line #11 and add a `<div>` that calls the `ui-view` directive:

```xml
<div ui-view></div>
```
- Since we're here, let's also bind the section header to data from the current state.
- Locate the `TODO` near line #4 and add:

```xml
<h2>{{$state.current.data.section}}</h2>
```
- This is taking advantage of the fact that we've assigned `$state` to `$rootScope` and is binding to `section` in the state's data.

### Set up the application states

- Let's set up the 'root' state that is the parent state for all of our application states.
- The root state has the following requirements:
  - The name of the state is "app".
  - The url for the state is "/app".
  - The state cannot be transitioned to or is *abstract*
  - We need to set the title for the application in the state's *data* object.
  - The state has 2 views:
    - `navbar` : maps the *navbar.html* template to the *NavCtrl* controller.
    - `content` : maps the *index.html* template to the *AppCtrl" controller.
      - This is also where the main content of the application will be displayed.

- Open **client/src/app/app.js**.

- Locate the `TODO` near line #2 and add the UI Router module as a dependency:

```javascript
'ui.router',
```

- With that completed, we now can use the `$stateProvider` service.
- At the `TODO` near line #11 register the *app* state with the `$stateProvider`.

```javascript
.config(function ($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      data: {
        title: 'The Timesheet App'
      },
      views : {
        'navbar' : {
          controller: 'NavCtrl',
          templateUrl: 'assets/templates/app/navbar.html'
        },
        'content' : {
          controller: 'AppCtrl',
          templateUrl: 'assets/templates/app/index.html'
        }
      }
    });
});
```

- Open your browser and navigate to http://localhost:3000
- What do you see? Are the nav bar and content views displaying? Why not?
- Think we should implement some states for `Projects`?

&nbsp;
## Projects States

### Register the states for Project
- Since our application attempts to default to the */app/project* url, let's implement that so we can view and manage projects.
- Open **client/src/app/projects/projects.js**
- Locate the `TODO` near line #5 and register the states for project

###### Start the configuration

- First, let's start by registering the main projects' state.
- The `app.projects` state has the following requirements:
  - It must be a child state of the `app` state.
  - It must connect `ProjectCtrl` controller to the `index.html` template.
  - It must set `section` of the state's data to 'Projects'

```javascript
.config(function ($stateProvider) {

 $stateProvider
   .state('app.projects', {
     url: '/projects',
     controller: 'ProjectCtrl',
     templateUrl: 'assets/templates/app/projects/index.html',
     data: {
       section: 'Projects'
     }
   });
 })
```

- Did the `karama` and/or `watch` task report an error?
- If so, do you remember how to fix it? (hint: There's a `TODO` at the top of the page.)

###### Register the project detail state
- Most of this will look familiar but here are some new concepts.
- We are setting up a url parameter of `_id`.
  - When we transition to this state, the url will contain the value of the transition configuration's `_id` property.
  - This value will also be made available to the `$stateParams` service and can be accessed by `$stateParams._id`.
  - We will see more of how this works when we implement our controllers.


- Right below our `app.projects` state, register the project detail state.
  - This can be 'chained' directly after the closing parens of the `app.projects` declaration.

```javascript
   .state('app.projects.detail', {
     url: '/detail/:_id',
     controller: 'ProjectDetailCtrl',
     templateUrl: 'assets/templates/app/projects/form.html',
     data: {
       section: 'Project Details',
       saveText: 'Update'
     },
     resolve : {
       project: [
         '$control',
         '$stateParams',
         function ($control, $stateParams) {
           return $control.get('projects', $stateParams);
         }]
     }
   })
```
- Did you notice the `resolve` configuration block?
- This is instructing `ui.router` to do a few things before transitioning to this state when requested:
  - Create an injectable resource named `project`.
  - Assign the result of the function call to the `project` property.
  - Do not fully transition to the state until all of the promises in the resolve block have resolved.

###### Register the project create state
- Finally, let's register the create state:

```javascript
   .state('app.projects.create', {
     url: '/create',
     controller: 'ProjectCreateCtrl',
     templateUrl: 'assets/templates/app/projects/form.html',
     data: {
       section: 'Create Project',
       saveText: 'Create'
     }
   });
```
- Nothing new here, but can you describe what is happening in this configuration?


### Add the controllers

- Now that we have our states registered, we need to implement our controller methods to manage our projects and transition between states.

- Open **client/src/app/projects/controllers.js**

### ProjectCtrl

###### Inject the service dependencies

- Find the `TODO` near line #4 and inject the `$state` and `$stateParams` services:

```javascript
function ($scope, project, $state, $stateParams) {
```

###### Handle transitioning to detail and create forms
- Let's add the methods to handle transitioning to the detail and create states.
- At the `TODO` near line #14, add:

```javascript
$scope.showDetail = function showDetail (project) {
  if (project.deleted) {
    console.log('cannot view a deleted project');
    return;
  }
  $state.go('app.projects.detail', project);
};

$scope.createNew = function createNew () {
  $state.go('app.projects.create', $stateParams);
};
```
- Notice that we are using the `$state` service's `go()` method, which is a shortcut for the `transition()` method.


###### Handle cancel
- Someone clicked a cancel button? No problemo.
- Replace the `TODO` near line #49 with:

```javascript
$scope.cancel = function cancel () {
  $state.go('app.projects', {}, {reload: true});
};
```
- What's new?
  - Notice that we are passing a configuration object to the `go()` method as the third argument with `reload:true`?
  - This tells `ui.router` to completely resolve the state again.
  - Parent states and their data remain in memory once they are initialized.
  - In order to make the page 'refresh' itself and make sure it has the most recent data, we force it to `reload`.

### ProjectDetailCtrl

###### Handle saving an updated project

- Before we can add a save method to the `ProjectDetailCtrl`, we need to handle some dependencies.
- Locate the `TODO` near line #60 and inject the `$state` and `$stateParams` services.

```javascript
function ($scope, project, $state, $stateParams) {
```

- And then set the `saveText` on scope to the current state's data:

```javascript
$scope.saveText = $state.current.data.saveText;
```

- Now we can implement the functionality to save an updated project.
- Locate the `TODO` near line #62 and add:

```javascript
$scope.save = function save () {
  $scope.project.$update()
    .then(function (updated) {
      $scope.project = updated;
      console.log('success !');
    })
    .catch(function (x) {
      console.log('error : ' + x);
    });
};
```

### ProjectCreateCtrl

###### Handle saving a new project
- Next we need to implement the functionality to save a new project.


- First use the instructions in the `TODO`'s near lines #82 and 84 to set `saveText` and inject the `$state` and `$stateParams` services.
  - You just did something similar to this in the previous section.


- Locate the `TODO` near line #80 and add:

```javascript
$scope.save = function save () {
  $control.create('projects', $scope.project)
    .then(function (created) {
      $state.go('app.projects.detail', {_id: created._id});
      console.log('success !');
    })
    .catch(function (x) {
      console.log('error : ' + x);
    });
};
```

- Now that we have our controller functions implemented, let's write some tests to verify the behavior!

### Testing our new controller methods
- Open **client/test/unit/app/projects/controllers.spec.js**

### Controllers Module

###### Inject `$state` and `$stateParams`

- Locate the `TODO` near line #25 and inject the two services into our `beforeEach` block:

```javascript
beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_, _$state_, _$stateParams_){
  $rootScope = _$rootScope_;
  $httpBackend = _$httpBackend_;
  $controller = _$controller_;
  $api = _$api_;
  $state = _$state_;
  $stateParams = _$stateParams_;
}));
```
- Did you notice that the injected services in the arguments list were surrounded by underscores? (_)
- Angular provides us with this syntax to help avoid naming collisions. It's handy, but not required.
- You can use the normal injection syntax in your `inject()` functions, if you wish.

###### Stub the $state service

- Locate the `TODO` near line #37 and create a `sinon.stub` of the `$state` service.
- Note: Stubs are different than spies, because they actually replace the functionality of the stubbed service's methods with mocked implmentations.

```javascript
state: sinon.stub($state)
```

### ProjectCtrl

###### Inject the mocked $state service into our controller
- In order for us to be able to get the statistics we want from our stubbed `$state` service, we need to make sure that the controller is using it.
- We do that by including it in our `$controller` constructor.
- Locate the `TODO` near line #58 and inject our services:

```javascript
$state: spies.state,
$stateParams: $stateParams
```
- Now it's time to write our tests.

###### Verify the transition to the detail state
* Locate the `TODO` near line #84 and test the detail transition:

```javascript
it('should transition to the project detail state', function () {
  $httpBackend.flush();
  $scope.showDetail(project);
  expect(spies.state.go).to.have.been.calledWith('app.projects.detail', project);
});
```
- Notice that we are using `chai`'s `calledWith()` matcher to verify that the `$state` service was called with the params we expect.

###### Verify the transition to the create state
- Locate the `TODO` near line #92 and test the create transition:

```javascript
it('should transition to the create project state', function () {
  $httpBackend.flush();
  $scope.createNew();
  expect(spies.state.go).to.have.been.calledWith('app.projects.create');
});
```

###### Verify the behavior of cancel
- Locate the `TODO` near  line #176 and test the cancel transition:

```javascript
it('should return back to the project list', function () {
  $httpBackend.flush();
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.projects');
});
```

- Check you `karma` console output. Are all tests passing yet? How about just the ones you've written up to now?

&nbsp;
### ProjectDetailCtrl

###### Test the update controller methods
- Now that we have verified the behavior of our `ProjectCtrl` controller, let's tackle the `ProjectDetailCtrl`.

- We first need to set up the `data` on our stubbed `$state` service.
- Replace the `TODO` near line #188 with:

```javascript
$state.current = {data: {saveText: 'update'}};
```

- Locate the `TODO` near line #190 and inject the stubbed `$state` and the `$stateParams` service.

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Replace the `TODO` line #204 to verify that `saveText` is set from the current state's data object.

```javascript
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('update');
});
```

- Replace the `TODO` near line #208 to verify that a project is injected from the state's resolve block.

```javascript
it('should set the project on scope to the resolved project', function () {
  expect($scope.project._id).to.equal(project._id);
  expect($scope.project.name).to.equal(project.name);
});
```

- And finally, let's test that the updated project is set on scope when the update is successful.
- Replace the `TODO` near line #228 with:

```javascript
it('should set the project on scope to be the updated project', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.project.name).to.equal(updatedProject.name);
});
```

- Time to run the tests and verify that we are all green!!

&nbsp;
### ProjectCreateCtrl

###### Test the create controller methods

- Now we just need to test the `ProjectCreateCtrl` method:
- Locate the `TODO' near line #241 and set up the current state's data object:

```javascript
$state.current = {data: {saveText: 'create'}};
```
- Inject the stubbed `$state` and the `$stateParams` services:

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Replace the `TODO` near line #256 to test the controller's initialization:

```javascript
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('create');
});

it('should set the project on scope to an empty object', function () {
  expect($scope.project).to.be.empty;
});
```

- Now let's test the transition that occurs after a project has been successfully created.
- Locate the `TODO` near line #277 and replace it with:

```javascript
it('should transition to the detail page of the created project', function () {
  $scope.save();
  $httpBackend.flush();
  expect(spies.state.go).to.have.been.calledWith('app.projects.detail', {_id: project._id});
});
```

- It's time again to run the tests and verify that we are all green!

### See it in Action!

- Now that our controller methods have been thoroughly tested, let's put our code to work.

###### Add the state to the NavBar

- Open **client/assets/templates/app/navbar.html**
- At the `TODO` near line #10, add the following directives to the list item and its link:

```xml
<li ng-class="{active: $state.includes('app.projects')}">
  <a ui-sref="app.projects">Projects</a>
```
###### Add the model binding and click handlers to the form template

- Open **client/assets/templates/app/projects/form.html**
- Follow the instructions provided by the `TODO`'s and add the `ng-model` and `ng-click` bindings where needed.

###### Add the model binding and ui-view directives to the list template.
- Open **client/assets/templates/app/projects/index.html**

- Ensure that the list table is only shown when we are in the `app.projects` state.
- Locate the `TODO` near line #2 and add the following `ng-show` to the `<div>`:

```xml
<div ng-show="$state.is('app.projects')">
```

- Add the 'Create New' button.
- Near line #7, add the button below:  

```xml
<button class="btn btn-primary btn-block" type="button" ng-click="createNew()">
  <i class="icon-plus"></i>
  New Project
</button>
```

- Follow the instructions provided by the remaining `TODO`'s to add the `ng-model` and `ui-view` directives where needed.

###### Run the application and see your work
- With everything in place, it's time to reap the fruits of our labor.
- Start the application with `grunt runapp:development` and `grunt watch:development`.
- Open a browser to http://localhost:3000
- Were you immediately redirected to the `app.projects` state?

- With that under our belt, implementing the `employees` states and controllers should be a piece of cake, right?

&nbsp;
## Employees States

- Time to add the implementation for our employee states.

###### Register the Employee states
- Open **client/src/app/employees/employees.js**
- Starting at the `TODO` near line #6, add:

```javascript
.config(function ($stateProvider) {

  $stateProvider
    .state('app.employees', {
      url: '/employees',
      controller: 'EmployeeCtrl',
      templateUrl: 'assets/templates/app/employees/index.html',
      data: {
        section: 'Employees'
      }
    })

    .state('app.employees.detail', {
      url: '/detail/:_id',
      controller: 'EmployeeDetailCtrl',
      templateUrl: 'assets/templates/app/employees/form.html',
      data: {
        section: 'Update Employee',
        saveText: 'Update'
      },
      resolve : {
        employee : [
          '$control',
          '$stateParams',
          function ($control, $stateParams) {
            return $control.get('employees', $stateParams);
          }]
      }
    })

    .state('app.employees.create', {
      url: '/create',
      controller: 'EmployeeCreateCtrl',
      templateUrl: 'assets/templates/app/employees/form.html',
      data: {
        section: 'Create Employee',
        saveText: 'Create'
      }
    });
});
```
- Look pretty familiar?
- Look for other `TODO`'s in the page and follow their instructions. (look a the top)

&nbsp;
### EmployeeCtrl

###### Implement the employee controllers

- Just like in Projects, we need to implement similar functionality in our employee controllers.

- Open **client/src/app/employees/controllers.js**

##### First things first: Find the related `TODO`'s and inject `$state` and `$stateParams` into all 3 of our controllers.

```javascript
function ($scope, project, $state, $stateParams) {
```

- At the `TODO` near line #14, add the `showDetail` and `createNew` methods:

```javascript
$scope.showDetail = function showDetail (employee) {
  if (employee.deleted) {
     console.log('cannot view a deleted employee');
     return;
  }
  $state.go('app.employees.detail', employee);
};

$scope.createNew = function createNew () {
  $state.go('app.employees.create', $stateParams);
};
```

- Add the `cancel` function by replacing the `TODO` near line #50 with:

```javascript
$scope.cancel = function cancel () {
  $state.go('app.employees', {}, {reload: true});
};
```
&nbsp;
### EmployeeDetailCtrl

###### Set `saveText`

```javascript
$scope.saveText = $state.current.data.saveText;
```

###### Updating an employee
- Add the saving of an updated employee.
- Locate the `TODO` near line #63 and add:

```javascript
$scope.save = function save () {
  $scope.employee.$update()
    .then(function (updated) {
      $scope.timesheet = updated;
      console.log('success!');
    })
    .catch(function (x) {
      console.log('error : ' + x);
    });
};
```
&nbsp;
### EmployeeCreateCtrl

###### Set `saveText`

```javascript
$scope.saveText = $state.current.data.saveText;
```

###### Employee create controller
- Add the saving of a newly created employee.
- Find the `TODO` near line #81 and add:

```javascript
$scope.save = function save () {
  $control.create('employees', $scope.employee)
    .then(function (created) {
      console.log('success!');
      $state.go('app.employees.detail', {_id: created._id});
    })
    .catch(function (x) {
      console.log('error : ' + x);
    });
};
```
- Are you beginning to notice any patterns?

&nbsp;
### Unit test the Controllers

- Now that we have implemented our employee controllers, let's test the behavior!
- Open **client/test/unit/app/employees/controllers.spec.js**

###### Test setup
- Just like you did in `Project`'s Jasmine tests, inject the `$state` and `$stateParams` services into your mock module:
- Locate the `TODO` near line #25 and inject the two services into our `beforeEach` block:

```javascript
beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _$api_, _$state_, _$stateParams_){
  $rootScope = _$rootScope_;
  $httpBackend = _$httpBackend_;
  $controller = _$controller_;
  $api = _$api_;
  $state = _$state_;
  $stateParams = _$stateParams_;
}));
```
- Stub the `$state` service by replacing the `TODO` near line #37 with:

```javascript
state: sinon.stub($state)
```

&nbsp;
### EmployeeCtrl

###### Write the tests

- Let's inject our stubbed services into our controller under test:
- Around line #62, replace the `TODO` with:

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Test the detail transition by replacing the `TODO` near line #91 with:

```javascript
it('should transition to the employee detail state', function () {
  $httpBackend.flush();
  $scope.showDetail(employee);
  expect(spies.state.go).to.have.been.calledWith('app.employees.detail');
});
```

- Test the create employee transition by replacing the `TODO` near line #98 with:

```javascript
it('should transition to the create employee state', function () {
  $httpBackend.flush();
  $scope.createNew();
  expect(spies.state.go).to.have.been.calledWith('app.employees.create');
});
```

- Test the cancel transition by replacing the `TODO` near line #183 with:

```javascript
it('should return back to the employee list', function () {
  $httpBackend.flush();
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.employees');
});
```

&nbsp;
### EmployeeDetailCtrl

###### Test the employee detail controller

- Locate the `TODO` near line #195 and set up the current state's data:

```javascript
spies.state.current = {data: {saveText: 'update'}};
```

- Next, Let's inject our stubbed services into our controller under test:
- Replace the `TODO` with:

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Test that `saveText` was added to scope from the current state's date by replacing the `TODO` near line #211 with:

```javascript
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('update');
});
```

- Test the controller is initialized with the employee injected from the state's resolve by replacing the `TODO` near line 215 with:

```javascript
it('should set the employee on scope to the resolved employee', function () {
  expect($scope.employee._id).to.equal(employee._id);
  expect($scope.employee.username).to.equal(employee.username);
});
```

- Test an updated employee is saved to scope.
- Find the `TODO' near line #235 and replace it with:

```javascript
it('should set the employee on scope to be the updated employee', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.employee.username).to.equal(updatedEmployee.username);
});
```
&nbsp;
### EmployeeCreateCtrl

###### Test the create employee controller

- Set the current state's data for testing.
- Near line #248 replace the `TODO` with:

```javascript
spies.state.current = {data: {saveText: 'create'}};
```

- Next, Let's inject our stubbed services into our controller under test:
- Replace the `TODO` with:

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Test that the controller is initialized as expected.
- Replace the `TODO` near line #263 with:

```javascript
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('create');
});

it('should set the employee on scope to a non admin user', function () {
  expect($scope.employee.admin).to.be.false;
  expect($scope.employee.username).to.be.empty;
});
```

- Test the cancel button by replacing the `TODO` near line #285:

```javascript
it('should transition to the detail page of the created employee', function () {
  $scope.save();
  $httpBackend.flush();
  expect(spies.state.go).to.have.been.calledWith('app.employees.detail', {_id: employee._id});
});
```

- If you haven't already, check your `karma` console and verify that all of your wonderful tests are passing.

### Add all the things to our views

- Now that we have our states configured and our controllers tested, let's add the functionality to our views so we can see what happens.

###### Navigation
- First let's add the ability to navigate to our employees states to the NavBar
- Open **client/assets/templates/app/navbar.html**
- Find the `TODO` near line #13 and add the `ng-class` and `ui-sref` directives to our markup.

```xml
<li ng-class="{active: $state.includes('app.employees')}">
  <a ui-sref="app.employees">Employees</a>
```
###### List View

- Open **client/assets/templates/app/employees/index.html**
- At the `TODO` near line #5, add the button to navigate to the create employee state:

```xml
<button class="btn btn-primary btn-block" type="button" ng-click="createNew()">
  <i class="icon-plus"></i>
  New Employee
</button>
```
- Follow the instructions provided by the remaining `TODO`'s to add `ng-click` and `ui-view` directives where needed.

###### Form View

- Open **client/assets/templates/app/employees/form.html**
- Follow the instructions provided by the `TODO`'s to add `ng-model` and `ng-click` directives where needed.

### Run the Application

- Now that the views are also implemented we can start the app and see our progress.
- Can you navigate between project and employee states?
- Can you create new projects and employees?
- Can you update existing projects?

- Only two more modules to go and we will have the basis for our application!!

&nbsp;
## Development Help

- You may have noticed, and if not you will soon, that because of how these labs are set up, there are several `karma` tests failing way before you get to the implementation.
- That is what is great about the `karma.config.js` file.
- You can alter the configuration to only run the Jasmine specs that you are working on at that time by changing the test configuration from :

```javascript
'test/unit/**/*.spec.js',
```

- to something more specific, like:

```javascript
'test/unit/employees/controllers.spec.js',
```
- This would tell `karma` to only run the Employees' controller tests. Food for thought.

&nbsp;
## Timesheets and Timeunits States

- It's officially time to implement our timesheet states and controllers.
- These next two modules will differ ever so slightly from the projects and employees modules, because these will be demonstrating UI Router's ability to nest states and use inheritance.

###### Register timesheet states
- First, let's register the timesheet states.
- Open **client/src/app/timesheets/timesheets.js**
- Locate the `TODO` and register:

```javascript
.config(function ($stateProvider) {
  $stateProvider
    .state('app.timesheets', {
      url: '/users/:user_id/timesheets',
      controller: 'TimesheetCtrl',
      templateUrl: 'assets/templates/app/timesheets/index.html',
      data: {
        section: 'Timesheets'
      }
    })
    .state('app.timesheets.detail', {
      url: '/detail/:_id',
      controller: 'TimesheetDetailCtrl',
      templateUrl: 'assets/templates/app/timesheets/detail.html',
      data: {
        section: 'Timesheet Details'
      },
      resolve : {
        timesheet : [
          '$control',
          '$stateParams',
          function ($control, $stateParams) {
            return $control.get('timesheets', $stateParams);
          }
        ],
        timeunits : [
          '$control',
          '$stateParams',
          function ($control, $stateParams) {
            return $control.list('timeunits', {timesheet_id: $stateParams._id, user_id: $stateParams.user_id});
          }
        ]
      }
    })
    .state('app.timesheets.detail.edit', {
      url: '/edit',
      controller: 'TimesheetEditCtrl',
      templateUrl: 'assets/templates/app/timesheets/form.html',
      data: {
        section: 'Edit Timesheet',
        saveText: 'Update'
      }
    })
    .state('app.timesheets.create', {
      url: '/create',
      controller: 'TimesheetCreateCtrl',
      templateUrl: 'assets/templates/app/timesheets/form.html',
      data: {
        section: 'Create Timesheet',
        saveText: 'Create'
      }
    });
})
```
- This should be all very familiar to you by now, but notice that in the `app.timesheets.detail` state's resolve, we are injecting both a `timesheet` and a list of `timeunits`.

&nbsp;
### TimesheetCtrl

###### Open the controller file

- Open **client/src/app/timesheets/controllers.js**

##### First things first: Find the related `TODO`'s and inject `$state` and `$stateParams` into all 4 of the Timesheet controllers.

- Locate the `TODO` near line #8 and register the query object with the help of `$stateParams` service:

```javascript
var query = {
  user_id: $stateParams.user_id
};
```

- Implement the `showDetail` and `createNew` methods via the `TODO` near line #18:

```javascript
$scope.showDetail = function showDetail (timesheet) {
  if (timesheet.deleted) {
    console.log('error : cannot view a deleted timesheet');
    return;
  }
  $state.go('app.timesheets.detail', timesheet);
};

$scope.createNew = function createNew () {
  $state.go('app.timesheets.create', $stateParams);
};
```

&nbsp;
### TimesheetDetailCtrl

###### Timesheet detail controller

- Add the additional methods needed by replacing the `TODO` near line #63:

```javascript
$scope.edit = function edit (timesheet) {
  $state.go('app.timesheets.detail.edit', $stateParams);
};

$scope.cancel = function cancel () {
  $state.go('app.timesheets', $stateParams, {reload: true});
};

$scope.logTime = function logTime () {
  $state.go('app.timesheets.detail.timeunits.create', $stateParams);
};

$scope.showTimeunitDetail = function showTimeunitDetail (timeunit) {
  if (timeunit.deleted) {
    console.log('error ' + x);
    return;
  }

  $stateParams.timeunit_id = timeunit._id;
  $state.go('app.timesheets.detail.timeunits.edit', $stateParams);
};
```
&nbsp;
### TimesheetEditCtrl

###### Timesheet edit controller

- Locate the `TODO` near line #117 and set `saveText` to the current state's:

```javascript
$scope.saveText = $state.current.data.saveText;
```

- Add a save method to update an existing timesheet.
- Find the `TODO` around line #120 and replace it with:

```javascript
$scope.save = function save () {
  $scope.timesheet.$update()
    .then(function (updated) {
      $scope.timesheet = updated;
      console.log('success !');
    })
    .catch(function (x) {
      console.log('error ' + x);
    });
};
```

- Handle cancelling the form by replacing the `TODO` near line 131:

```javascript
$scope.cancel = function cancel () {
  $state.go('app.timesheets.detail', $stateParams, {reload: true});
};
```

&nbsp;
### TimesheetCreateCtrl

###### Create timesheet controller

- Locate the `TODO` and set `saveText` to the current state's:

```javascript
$scope.saveText = $state.current.data.saveText;
```

- Implement the required methods by replacing the `TODO` near line 142:

```javascript
$scope.save = function save () {
  var timesheet = angular.extend({user_id: $stateParams.user_id}, $scope.timesheet);

  $control.create('timesheets', timesheet)
    .then(function (created) {
      $state.go('app.timesheets.detail', {user_id: $stateParams.user_id, _id: created._id});
      console.log('success !');
    })
    .catch(function (x) {
       console.log('error ' + x);
    });
};

$scope.cancel = function cancel () {
  $state.go('app.timesheets', $stateParams, {reload: true});
};
```

&nbsp;
### Configure the Time Unit States

- Now let's configure the states for Timeunits.
- Open **client/src/app/timesheets/timeunits/timeunits.js**
- Configure the states by replacing the `TODO` near line #6 :

```javascript
.config(function ($stateProvider) {
  $stateProvider
    .state('app.timesheets.detail.timeunits', {
      abstract: true,
      url: '/timeunits',
      controller: 'TimeunitCtrl',
      template: '<div ui-view></div>',
      resolve: {
        projects: [
          '$control',
          function ($control) {
            return $control.list('projects');
          }]
      }
    })
    .state('app.timesheets.detail.timeunits.create', {
      url: '/create',
      controller: 'TimeunitCreateCtrl',
      templateUrl: 'assets/templates/app/timesheets/timeunits/form.html',
      data: {
        section: 'Log Time'
      }
    })
    .state('app.timesheets.detail.timeunits.edit', {
      url: '/edit/:timeunit_id',
      controller: 'TimeunitEditCtrl',
      templateUrl: 'assets/templates/app/timesheets/timeunits/form.html',
      data: {
        section: 'Edit Time'
      },
      resolve : {
        timeunit : [
          '$control',
          '$stateParams',
          function ($control, $stateParams) {
            return $control.get('timeunits', {_id: $stateParams.timeunit_id, user_id: $stateParams.user_id, timesheet_id: $stateParams._id});
          }]
      }
    });
})
```

&nbsp;
### Implement the Timeunit Controllers

- Now it's time to implement the behavior to the timeunit controllers.
- Open **client/src/app/timesheets/timeunits/controllers.js**

##### Dont forget to inject the $state and $stateParams services!!

&nbsp;
### TimeunitCtrl

###### Timeunit controller
- Add cancel functionality by replacing the `TODO` near line #7 with:

```javascript
$scope.cancel = function cancel () {
  $state.go('app.timesheets.detail', $stateParams, {reload: true});
};
```

&nbsp;
### TimeunitEditCtrl

###### Timeunit detail controller
- Add the ability to update an existing timeunit by replacing the `TODO` near line #17:

```javascript
$scope.save = function save () {
  $scope.timeunit.$update()
    .then(function (updated) {
      $scope.timeunit = updated;
      console.log('success !');
    })
    .catch(function (x) {
      console.log('error : ' + x);
      $state.reload();
    });
};
```

&nbsp;
### TimeunitCreateCtrl

###### Timeunit create controller

- Initialize all new time units with the appropriate employee, timesheet, and date worked.
- Replace the `TODO` near line #34 with:

```javascript
$scope.timeunit = {
  user_id: $stateParams.user_id,
  timesheet_id: $stateParams._id,
  dateWorked: $scope.timesheet.beginDate
};
```

- Add the ability to create a new time unit near line #39:

```javascript
$scope.save = function save () {
  $control.create('timeunits', $scope.timeunit)
    .then(function (created) {
      $state.go('app.timesheets.detail', $stateParams, {reload: true});
      console.log('success !');
    })
    .catch(function (x) {
      console.log('error : ' + x);
    });
};
```

&nbsp;
### Test the Timesheet Controllers

- Now that the controllers and states are implemented, we get the priviledge of testing them!! Woot!
- Since you've already done this twice, we'll have a little less instruction.
- Follow the instructions in the TODO's and user the below code for reference.

- Open **client/test/unit/app/timesheets/controllers.spec.js**

### Test setup
- As in previous tests, add the `$state` and `$stateParams` to our `beforeEach(inject())` block.

- Set the `user_id` on our test `$stateParams` (line #38)

```javascript
$stateParams.user_id = "1234567890";
```
- Find the `TODO` and create a test stub for the `$state` service:

```javascript
state: sinon.stub($state)
```

- Inject our test stubs into the test controller (near line #73)

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Set up a response for a GET for timesheets that includes the `user_id` from `$stateParams`:
- Find the `TODO` near line #80 and replace the previous `$httpBackend` config with:

```javascript
$httpBackend.when('GET', '/users/' + $stateParams.user_id + '/timesheets').respond(200, [{name: 'testTimesheet'}]);
```

&nbsp;
### TimesheetCtrl

- Test navigation to the timesheet detail (near line #100)

```javascript
it('should transition to the timesheet detail state', function () {
  $httpBackend.flush();
  $scope.showDetail(timesheet);
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail', timesheet);
});
```

- Test the navigation to the create timesheet (near line #108)

```javascript
it('should transition to the create timesheet state', function () {
  $httpBackend.flush();
  $scope.createNew();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.create');
});
```

&nbsp;
### TimesheetDetailCtrl

###### Timesheet detail controller
- Inject the stubbed services into our test controller (near line #203)

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Test the initialization of the controller (near line #215)

```javascript
it('should set the timesheet on scope to the resolved timesheet', function () {
  expect($scope.timesheet._id).to.equal(timesheet._id);
  expect($scope.timesheet.name).to.equal(timesheet.name);
});
```

- Test the transition to edit (near line #222)

```javascript
it('should transition to the edit state', function () {
  $scope.edit(timesheet);
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail.edit', $stateParams);
});
```

- Test cancel (near line #229)

```javascript
it('should return back to the timesheet list', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets');
});
```

- Test the transition for logging time (near line #236)

```javascript
it('should transition to the create timeunits state', function () {
  $scope.logTime();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail.timeunits.create', $stateParams);
});
```

- Test the transition for editting time units (near line #243)

```javascript
it('should set the timeunit_id on state params and transition to the edit timeunits state', function () {
  $scope.showTimeunitDetail({_id: 'abc'});
  expect($stateParams.timeunit_id).to.equal('abc');
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail.timeunits.edit');
});
```

&nbsp;
### TimesheetEditCtrl

###### Timesheet edit controller
- Set up the current state's data (near line #321)

```javascript
spies.state.current = {data: {saveText: 'update'}};
```

- Inject the stubbed services into our test controller (near line #203)

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Test controller initialization (near line #336)

```javascript
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('update');
});

it('should set the timesheet on scope to the resolved timesheet', function () {
  expect($scope.timesheet._id).to.equal(timesheet._id);
  expect($scope.timesheet.name).to.equal(timesheet.name);
});
```

- Test the injected timesheet (near line #360)

```javascript
it('should set the timesheet on scope to be the updated timesheet', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.timesheet.name).to.equal(updatedTimesheet.name);
});
```

- Test cancel (near line #370)

```javascript
it('should return back to the timesheet detail', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail');
});
```

&nbsp;
### TimesheetCreateCtrl

###### Create timesheet controller
- Set current state's data (near line #380)

```javascript
spies.state.current = {data: {saveText: 'create'}};
```

- Inject the stubbed services into our test controller

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Test controller initialization (near line #395)

```javascript
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('create');
});
```

- Test transition after successful create (near line #416)

```javascript
it('should transition to the detail page of the created timesheet', function () {
  $scope.save();
  $httpBackend.flush();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail', {user_id: $stateParams.user_id, _id: timesheet._id});
});
```

- Test cancel (near line #425)

```javascript
it('should return back to the timesheet list', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets');
});
```
&nbsp;
### Test the Timeunit Controllers
- With the Timsheet controllers all tested, it is time to test the Timeunits controllers behavior.

- Open **client/test/unit/app/timesheets/timeunits/controllers.spec.js**
- Test the Controllers by following the instructions in the `TODO`'s.
- Use the below code to help you if you get stuck:

###### Timeunit controller

- Set up our test `$stateParams` (near line #37)

```javascript
$stateParams.user_id = "1234567890";
$stateParams._id = "asdfghjklqwerty";
```

- Set the `user_id` on the test timeunit (near line #54)

```javascript
"user_id": $stateParams.user_id
```

- Create a stub for the `$state` service (near line #58)

```javascript
state: sinon.stub($state)
```

- Inject the stubbed services into our test controller

```javascript
$state: spies.state,
$stateParams: $stateParams
```

- Test a list of timeunits is resolved during the state transition (near line #82)

```javascript
it('should set the resolved list of projects on scope', function () {
  expect($scope.projects).to.equal(projects);
});

```

- Test cancel (near line #88)

```javascript
it('should return back to the timesheet detail', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail');
});
```

###### Edit timeunit controller
- Test a timunit is resolved during state transition (near line #111)

```javascript
it('should attach the resolved timeunit onto scope', function () {
  expect($scope.timeunit._id).to.equal(timeunit._id);
});
```

- Test the updated timesheet is set on scope (near line #130)

```javascript
it('should set the timeunit on scope to be the updated timeunit', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.timeunit.name).to.equal(updatedTimeunit.name);
});
```

###### Create timeunit controller
- Test a new timeunit is initialized on scope (near line #155)

```javascript
it('should initialize a new timeunit with user and timesheet ids', function () {
  expect($scope.timeunit.user_id).to.equal($stateParams.user_id);
  expect($scope.timeunit.timesheet_id).to.equal($stateParams._id);
});
```

- Test the newly created timeunit is added to scope (near line #175)

```javascript
it('should set the timeunit on scope to be the new timeunit', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.timeunit.name).to.equal(updatedTimeunit.name);
});
```
###### Run the tests
- Once again, if you haven't had them running as you implemented them, run the tests via `grunt kamra:unit`.
- Are they all passing? Are you tired yet?
- Ready for more? OK..let's set up our views!!

## Setting Up Our Views

### Add Navigation

- Let's add the timesheet state to our NavBar
- Open **client/assets/templates/app/navbar.html**

- Add the needed directives for timesheet (near line #16)

```xml
<li ng-class="{active: $state.includes('app.timesheets')}">
  <a ui-sref="app.timesheets({user_id: 'all'})">Timesheets</a>
```

- Notice that we are passing a javascript object as a parameter to the `app.timesheets()` function in the `ui-sref` directive?
  - This will set `user_id` on `$stateParams` for us to 'all'.
  - More on this when we implement security during the factories labs.

### Setting up the Timesheet Views

###### Timesheet list view

- Open **client/assets/templates/app/timesheets/index.html**
- Find the `TODO` near line #2 and add the `ng-show` directive:

```xml
<div ng-show="$state.is('app.timesheets')">
```

- Now we need a button to enable us to create a new timesheet (near line #5)

```xml
<button class="btn btn-primary btn-block" type="button" ng-click="createNew()">
  <i class="icon-plus"></i>
  New Timesheet
</button>
```
- Follow the remaining `TODO`'s to add `ng-click` and `ui-view` directives where needed.

###### Timesheet detail view

- Open **client/assets/templates/app/timesheets/detail.html**
- Locate the `TODO` near line #2 and add the `ng-show` directive

```xml
<div ng-show="$state.is('app.timesheets.detail')">
```
- Follow the instructions of the remaning `TODO`'s to add model bindings and `ng-click`, `ng-model`, and `ui-view` directives

###### Timesheet form template

- Open **client/assets/templates/app/timesheets/form.html**
- Use the instructions in the page's `TODO`s to add `ng-model` and `ng-click` directives where required.

###### Timeunit form template

- Open **client/assets/templates/app/timesheets/timeunits/form.html**
- We have a couple of special cases in this form:

- First let's set up the projects' select box.
- Locate the `TODO` near line #13 and set the repeater for the select box's `<option>`.

```xml
<option ng-repeat="project in projects" value="{{project.name}}">{{project.name}}</option>
```

- Next we will set up a date picker for the timeunit's date worked.
- Replace the `TODO` near line #21 with:

```xml
<input type="text" class="form-control"
   datepicker-popup="MM/dd/yyyy"
   ng-model="timeunit.dateWorked"  
   show-weeks="false"
   show-button-bar="false"
   min="timesheet.beginDate"
   max="timesheet.endDate"
   ng-required="true"
   close-text="Close" />
```
- Now use the instructions in the remaining `TODO`'s to add `ng-model` and `ng-click` directives where needed.

&nbsp;
## See the Results of Your Hard Work
- If you haven't already, start your application and test it out.
- Try going to a timesheet's detail and logging time.
- Try updating a timesheet or timeunit.
- Does it all work? Are you ready for a break? Me too, whew.
