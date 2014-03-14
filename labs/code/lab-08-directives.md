# Lab Eight - Directives

&nbsp;
## Checkout the lab branch
* In your console:
```
git checkout lab-8-directives
```

&nbsp;
## Form Validation

### Adding form validation to employees
- Probably the most common directives you will use will be Angular's form directives.
- Angular has form validation built in.
- Let's take advantage of that and add some form validation to the employees form.
- Open **client/assets/templates/app/employees/form.html**

- Add the following validation to the form:
  - Set the **username** to have a minimum length of 1, a max length of 40, and a required field.
  - Set the **email** to have a minimum length of 1, a max length of 100, and a required field.
  - Set the **first name** to have a minimum length of 1, a max length of 100, and a required field.
  - Set the **last name** to have a minimum length of 1, a max length of 100, and a required field.


- We want to make sure the user is not allowed to submit the form unless it is valid.
- In the button tag for the save button add the following directive:

```javascript
ng-disabled="employeeForm.$invalid"
```
- This watches the form with the name, `employeeForm`, to make sure it is valid.
- When it is valid, `employeeForm.$invalid` will resolve to false, so Angular will remove the attribute, `disabled` from the `<button>`.

- Now start the application and see what happens when you make the form valid and invalid.
- Feel free to play with different values for the validation parameters and see the effects.
- Pretty neat, huh?

&nbsp;
## Pagination Directive from UI Bootstrap

### UI Bootstrap Pagination

- Our product owners have decided that they only want to see 5 items at a time in our list pages.
- In order to accomodate them, we are going to use the *pagination directive* from the UI Bootstrap project.
- Your teammates have already added the library as an import to `index.html` and added as a dependency in `main.js`.
- The server team has also provided us with the correct API endpoints to retrieve paginated data.

- The first task we need to complete is to make sure that we can query the API for paginated data.
  - We will implement the employee list screen first.

### Pagination for Employees

###### Modify the controller method for getting a list of employees
- Open **client/src/app/employees/controllers.js**
- The pagination api expects a query object with a page number and sort properties.
- Find the `TODO` near line #7 and enter the following:

```javascript
var query = {
  page: page,
  sort: {username: 1}
};

$control.page('employees', query)
  .then(function (pageConfig) {
    $scope.pageConfig = pageConfig;
  });
```

- This creates the query object from page number that is passed in to the function and defaults the sort to the employee's username.
- We also make an employees API call to the pagination endpoint and sets the result to the `pageConfig` object on scope.

###### Test the api call
- Now we need to write the unit tests to verify that this functionality is working as expected.

- Open **client/test/unit/app/employees/controllers.spec.js**
- Look at lines #71 and #72
  - Your teammates have set up mock reponses for when a page request is made for employees.
  - Since there are two listed, they will be used in order. So the first request will return a 200 and the second will return a 200 with an object whose name is `pageConfig2`.


- We need to set up the expectation for the API call for the page of employees for when the controller initializes.
- Look for the `TODO` near line #79 and replace it with:

```javascript
$httpBackend.expect('GET', '/users?page=1&sort=%7B%22username%22:1%7D');
$httpBackend.flush();
```
- Now we can write our test.
- Find the `TODO` near line #85 and write the following test.

```javascript
it('should set the result to the pageConfig object', function () {
  $httpBackend.expect('GET', '/users?page=2&sort=%7B%22username%22:1%7D');
  $scope.requestEmployees(2);
  $httpBackend.flush();
  expect($scope.pageConfig.name).to.equal("pageConfig2");
});
```
- This test does the following for us:
  - Sets another expectation for an API call for a page of employees
  - Makes the call to request the employee page
  - Flushes the mock http backend
  - Checks that the `pageConfig` on scope is the response.

- Now run the tests, using `grunt karma:unit` in a separate console from your `runapp` and `watch` tasks.
- Did they pass?

###### Add the pagination directive to the employees list page

- Now that we have the function in place to request the page of employees, we can add the directive to the list page to control when and how the page requests are made.
- Open **client/assets/templates/app/employees/index.html**
- Look for the `TODO` near line 51 and add the following markup:

```xml
<div class="text-center">
  <div pagination
    total-items="pageConfig.totalItems"
    page="pageConfig.page"
    items-per-page="pageConfig.limit"
    boundary-links="true"
    rotate="true"
    on-select-page="requestEmployees(page)">
  </div>
</div>
```

- UI Bootstrap's pagination directive expects a number of attributes to control how it works.
  - `total-items` : The total number of items available in the database.
    - This helps the directive figure out how many buttons to display for pages.
  - `page` : The page number currently displayed
  - `items-per-page` : How many items are displayed per page.
    - Also used to determine how many page buttons there will be.
  - `boundary-links` : Whether or not to show the rewind and fast forward buttons.
  - `rotate` : Whether or not to keep the current page's button in the middle.
  - `on-select-page` : What happens when the user clicks one of the page buttons.
    - This automatically calls the function with the page number as the argument.

- With this directive added, navigate to the employees page and check to see if it is displayed.
- If you don't have over 5 employees added to the database, try adding several and watch what happens to the pagination directive.

&nbsp;
### Pagination for Timesheets

- Now that we have pagination for the employees page, use the above instructions as a guide and add pagination to timesheets.

###### Modify the controller to request a page of projects

- Find the `TODO` in **client/src/app/timesheets/controllers.js**

```javascript
var query = {
  user_id: $stateParams.user_id,
  page: page,
  sort: {beginDate: 1}
};

$control.page('timesheets', query)
  .then(function (pageConfig) {
    $scope.pageConfig = pageConfig;
  });
```

###### Test the controller's new functionality

- Find the `TODO`s in **client/test/unit/app/timesheets/controllers.spec.js**

- Near line #91 set up the API call expectation.

```javascript
$httpBackend.expect('GET', '/users/1234567890/timesheets?page=1&sort=%7B%22beginDate%22:1%7D');
$httpBackend.flush();
```

* line 96

```javascript
it('should set the result to the pageConfig object', function () {
  $httpBackend.expect('GET', '/users/1234567890/timesheets?page=2&sort=%7B%22beginDate%22:1%7D');
  $scope.requestTimesheets(2);
  $httpBackend.flush();
  expect($scope.pageConfig.name).to.equal("pageConfig2");
});
```

###### Add the directive to the timesheets list page

- Find the `TODO` in **client/assets/templates/app/timesheets/index.html** near line #49.

```xml
<div class="text-center">
  <div pagination
    total-items="pageConfig.totalItems"
    page="pageConfig.page"
    items-per-page="pageConfig.limit"
    boundary-links="true"
    rotate="true"
    on-select-page="requestTimesheets(page)">
  </div>
</div>
```

###### Run the application
- Time to verify that you have pagination for Timesheets.
- If it works, time to move on to the next section!


## Create a Section Header directive

###### The situation
- Now that you are an expert at using provided directives, it's time to create our own!!
- Our product owners have returned with more requests. They would like to have certain sections to have a consistent header that could also include other elements.
- To satisfy these requirements, the team has decided that a custom directive is needed so that it can be reused across multiple views.

###### Register the new directive

- Open **client/src/directives/form.js** and find the `TODO` near line #3.
- Register a `tszFormSectionHeader` directive that:
  - Replaces the DOM element that uses the directive.
  - Creates an isolate scope that expects a `header` attribute that will be assigned to the `header` property on scope.
  - Uses transclusion so that it can wrap other DOM elements like a picture frame.
  - Uses the template located at : `assets/templates/directives/form/form-header.html`


```javascript
.directive('tszFormSectionHeader', function () {
  return {
    replace: true,
    transclude: true,
    scope: {
      header: '@'
    },
    templateUrl: 'assets/templates/directives/form/form-header.html'
  };
})
```
###### Create the template

- Open **client/assets/templates/directives/form/form-header.html**
- Add the following markup to the template:

```xml
<div class="row tsz-form-section-header">
  <div class="col-xs-6">
    <h4>{{header}}</h4>
  </div>
  <div class="col-xs-6">
    <div ng-transclude></div>
  </div>
</div>
```

- What does this template do?
  - Creates an evenly spaced 2 column row.
  - Binds to `scope.header` in the first column.
  - Inserts any DOM that the element wraps into the second column. (via `ng-transclude` directive)

###### Test the directive

- Now let's test the new directive to show that it is behaving as expected.
- Directive unit tests take a little more setup than any other tests, because they are so dependent on the DOM and need to be compiled and linked by Angular.
- Open **client/test/unit/directives/form.spec.js**
- Find the `TODO` near line #13 and register the directive's template as a dependency:

```javascript
'assets/templates/directives/form/form-header.html',
```
- Since we registered the `karma-ng-html2js-preprocessor` plugin in our *karma.config.js*, we are able to register the template as a dependency and have it added to the `$templateCache` service so that we can use it in our tests.

- Find the `TODO` near line #30 and set up the test fixture.
  - Using `angular.element()`, create a DOM element that calls the directive.
  - Use the `$compile` service to get a compile function from the created element and call the compile function passing in your test scope.
  - Have Angular run a digest and apply so that the compiled template is ready for testing.

```javascript
element = angular.element(
 '<div tsz-form-section-header header="{{headerName}}">' +
 '   <p>{{content}}</p>' +
 '</div>');

$compile(element)($scope);

$scope.$digest();
$scope.$apply();
```
#### HERE
- line 42

```javascript
it('should set the header content within the directive template', function () {
  expect(element.find('h4').text()).to.equal('My Header');
});

it('should respond to changes', function () {
  expect(element.find('h4').text()).to.equal('My Header');
  $scope.$apply(function() {
    $scope.headerName = 'My Updated Header';
  });
  expect(element.find('h4').text()).to.equal('My Updated Header');
});
```

- line 55

```javascript
it('should transclude the directive element contents', function () {
  expect(element.find('p').text()).to.equal('My Content');
});
it('should respond to changes', function () {
  expect(element.find('p').text()).to.equal('My Content');
  $scope.$apply(function() {
    $scope.content = 'My Updated Content';
  });
  expect(element.find('p').text()).to.equal('My Updated Content');
});
```


### timesheet/client/assets/templates/app/timesheets/detail.html
- line 7

```xml
<div tsz-form-section-header header="Timesheet Details"></div>
```

- line 39

```xml
<div tsz-form-section-header header="Timesheet Progress"></div>
```

- line 65

```xml
<div tsz-form-section-header header="Time Units">
  <div class="row">
    <div class="col-sm-4 col-sm-offset-8 pull-right">
      <button type="button" class="btn btn-primary btn-block" ng-click="logTime()">Log Time</button>
    </div>
</div>
```


## Create a Timesheet Progress Indicator

### timesheet/client/assets/templates/app/timesheets/detail.html

- line 41

```xml
<div class="row">
  <div class="col-xs-12">
    <div tsz-weekly-progress-bar hours-worked="hoursWorked()"
      hours-required="hoursRequired()" report="reportStatus(percentComplete)"></div>
  </div>
</div>
```

### timesheet/client/assets/templates/directives/timesheet/progress-bar.html

```xml
<div class="progress" ng-click="progressClicked()">
  <div class="progress-bar" style="width: {{percentComplete > 100 ? 100 : percentComplete}}%;">
    {{percentComplete | number:0}}%
  </div>
</div>
```



### timesheet/client/src/directives/timesheet.js

- line 3

```javascript
.directive('tszWeeklyProgressBar', function () {
  return {
    replace: true,
    scope: {
      hoursRequired: '=',
      hoursWorked: '=',
      report: '&'
    },
    templateUrl: 'assets/templates/directives/timesheet/progress-bar.html',
    link: function (scope, element) {
      scope.$watch(function() {
        return (scope.hoursWorked / scope.hoursRequired) * 100;
      }, function(percentComplete) {
        scope.percentComplete = percentComplete;
      });

      scope.progressClicked = function progressClicked() {
        scope.report({percentComplete: Math.round(scope.percentComplete) + "%"});
      };
    }
  };
});
```

### timesheet/client/test/unit/directives/timesheet.spec.js

- line 11

```javascript
'timesheet.directives',
'ngResource',
'assets/templates/directives/timesheet/progress-bar.html'
```

- line 24

```javascript
beforeEach(function () {
  $scope.hoursWorked = 40;
  $scope.hoursRequired = 100;

  element = angular.element(
    '<div tsz-weekly-progress-bar' +
    '  hours-worked="hoursWorked"'  +
    '  hours-required="hoursRequired"' +
    '  report="reportStatus(percentComplete)">' +
    '</div>');

  $compile(element)($scope);

  $scope.$digest();
  $scope.$apply();
});

describe('progress bar <= 100%', function() {
  it('should set the progress bar width to the percent complete', function () {
    expect(element.find('.progress-bar').css('width')).to.equal('40%');
  });

  it('should set the progress bar contents to the percent complete', function () {
    expect(element.find('.progress-bar').text().trim()).to.equal('40%');
  });
});

describe('progress bar > 100%', function() {
  beforeEach(function() {
    $scope.$apply(function() {
      $scope.hoursWorked = 80;
      $scope.hoursRequired = 40;
    });
  });

  it('should set the progress bar width to 100% complete', function () {
    expect(element.find('.progress-bar').css('width')).to.equal('100%');
  });

  it('should set the progress bar contents to the percent complete', function () {
    expect(element.find('.progress-bar').text().trim()).to.equal('200%');
  });
});
```
########################################################
