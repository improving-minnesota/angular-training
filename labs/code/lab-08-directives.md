### timesheet/client/assets/templates/app/employees/index.html

* line 51

```
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

### timesheet/client/assets/templates/app/timesheets/detail.html

* line 7

```
<div tsz-form-section-header header="Timesheet Details"></div>
```

* line 39

```
<div tsz-form-section-header header="Timesheet Progress"></div>
```

* line 41

```
<div class="row">
  <div class="col-xs-12">
    <div tsz-weekly-progress-bar hours-worked="hoursWorked()" 
      hours-required="hoursRequired()" report="reportStatus(percentComplete)"></div>
  </div>
</div>
```

* line 65

```
<div tsz-form-section-header header="Time Units">
  <div class="row">
    <div class="col-sm-4 col-sm-offset-8 pull-right">
      <button type="button" class="btn btn-primary btn-block" ng-click="logTime()">Log Time</button>
    </div>
</di>
```

### timesheet/client/assets/templates/app/timesheets/index.html

* line 49

```
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

### timesheet/client/assets/templates/app/employees/form.html
### timesheet/client/assets/templates/app/projects/form.html
### timesheet/client/assets/templates/app/timesheets/form.html
### timesheet/client/assets/templates/app/timesheets/timeunits/form.html

Add form validation

### timesheet/client/assets/templates/directives/form/form-header.html

```
<div class="row tsz-form-section-header">
  <div class="col-xs-6">
    <h4>{{header}}</h4>
  </div>
  <div class="col-xs-6">
    <div ng-transclude></div>
  </div>
</div>
```

### timesheet/client/assets/templates/directives/timesheet/progress-bar.html

```
<div class="progress" ng-click="progressClicked()">
  <div class="progress-bar" style="width: {{percentComplete > 100 ? 100 : percentComplete}}%;">
    {{percentComplete | number:0}}%
  </div>
</div>
```

### timesheet/client/src/app/employees/controllers.js

* line 7 

```
var query = {
  page: page,
  sort: {username: 1}
};

$control.page('employees', query)
  .then(function (pageConfig) {
    $scope.pageConfig = pageConfig;
  });
```

### timesheet/client/src/app/projects/controllers.js

* line 7

```
var query = {
  page: page,
  sort: {name: 1}
};

$control.page('projects', query)
  .then(function (pageConfig) {
    $scope.pageConfig = pageConfig;
  });
```

### timesheet/client/src/app/timesheets/controllers.js

* line 7

```
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

### timesheet/client/src/directives/form.js

* line 3

```
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

### timesheet/client/src/directives/timesheet.js

* line 3

```
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

### timesheet/client/test/unit/app/employees/controllers.spec.js

* line 79

```
$httpBackend.expect('GET', '/users?page=1&sort=%7B%22username%22:1%7D');
$httpBackend.flush();
```

* line 85

```
it('should set the result to the pageConfig object', function () {
  $httpBackend.expect('GET', '/users?page=2&sort=%7B%22username%22:1%7D');
  $scope.requestEmployees(2);
  $httpBackend.flush();
  expect($scope.pageConfig.name).to.equal("pageConfig2");
});
```

### timesheet/client/test/unit/app/projects/controllers.spec.js

* line 75

```
$httpBackend.expect('GET', '/projects?page=1&sort=%7B%22name%22:1%7D');
$httpBackend.flush();
```

* line 81

```
it('should set the result to the pageConfig object', function () {
  $httpBackend.expect('GET', '/projects?page=2&sort=%7B%22name%22:1%7D');
  $scope.requestProjects(2);
  $httpBackend.flush();
  expect($scope.pageConfig.name).to.equal("pageConfig2");
});
```

### timesheet/client/test/unit/app/timesheets/controllers.spec.js

* line 91

```
$httpBackend.expect('GET', '/users/1234567890/timesheets?page=1&sort=%7B%22beginDate%22:1%7D');
$httpBackend.flush();
```

* line 96

```
it('should set the result to the pageConfig object', function () {
  $httpBackend.expect('GET', '/users/1234567890/timesheets?page=2&sort=%7B%22beginDate%22:1%7D');
  $scope.requestTimesheets(2);
  $httpBackend.flush();
  expect($scope.pageConfig.name).to.equal("pageConfig2");
}); 
```

### timesheet/client/test/unit/directives/form.spec.js

* line 13

```
'assets/templates/directives/form/form-header.html',
```

* line 30

```
element = angular.element(
 '<div tsz-form-section-header header="{{headerName}}">' +
 '   <p>{{content}}</p>' +
 '</div>');

$compile(element)($scope);

$scope.$digest();
$scope.$apply();
```

* line 42

```
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

* line 55

```
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

### timesheet/client/test/unit/directives/timesheet.spec.js

* line 11

```
'timesheet.directives',
'ngResource',
'assets/templates/directives/timesheet/progress-bar.html'
```

* line 24

```
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














