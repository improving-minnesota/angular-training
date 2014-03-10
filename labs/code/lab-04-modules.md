### timesheet/client/assets/templates/app/employees/index.html

* line 22

```
<tr ng-repeat="employee in employees" 
    class="fadeable-row"
    ng-class="{faded: employee.deleted}">
```
* line 26

```
<td>{{employee.username}}</td>
<td>{{employee.email}}</td>
<td>{{employee.firstName}}</td>
<td>{{employee.lastName}}</td>
<td>{{employee.admin}}</td>
```

* line 32

```
<div ng-switch="employee.deleted">
  <div ng-switch-when="true">
    <button class="btn btn-sm btn-default" ng-click="restore(employee); $event.stopPropagation();">Restore</button>
  </div>
  <div ng-switch-default>
    <button class="btn btn-sm btn-danger" ng-click="remove(employee); $event.stopPropagation();">Delete</button>
  </div>
</div>
```

### timesheet/client/assets/templates/app/projects/index.html

* line 14

```
<tr ng-repeat="project in projects" 
	 class="fadeable-row"
	 ng-class="{faded: project.deleted}">

	 <td>{{project.name}}</td>
	 <td>{{project.description}}</td>
 ```

* line 21

```
 <div ng-switch="project.deleted">
   <div ng-switch-when="true">
     <button class="btn btn-sm btn-default" ng-click="restore(project); $event.stopPropagation();">Restore</button>
   </div>
   <div ng-switch-default>
     <button class="btn btn-sm btn-danger" ng-click="remove(project); $event.stopPropagation();">Delete</button>
   </div>
 </div>
 ```

### timesheet/client/assets/templates/app/timesheets/index.html

* line 16

```
<tr ng-repeat="timesheet in timesheets" 
	class="fadeable-row"
	ng-class="{faded: timesheet.deleted}">

	<td>{{timesheet.beginDate}}</td>
	<td>{{timesheet.endDate}}</td>
	<td>{{timesheet.name}}</td>
	<td>{{timesheet.description}}</td>
```

* line 25

```
<div ng-switch="timesheet.deleted">
	<div ng-switch-when="true">
	  <button class="btn btn-sm btn-default" ng-click="restore(timesheet); $event.stopPropagation();">Restore</button>
	</div>
	<div ng-switch-default>
	    <button class="btn btn-sm btn-danger" ng-click="remove(timesheet); $event.stopPropagation();">Delete</button>
	</div>
</div>
```

### timesheet/client/src/app/app.js

```
$routeProvider
  .when('/projects', {
     templateUrl: 'assets/templates/app/projects/index.html',
     controller: 'ProjectCtrl'
   })
   .when('/employees', {
     templateUrl: 'assets/templates/app/employees/index.html',
     controller: 'EmployeeCtrl'
   })
   .when('/timesheets', {
     templateUrl: 'assets/templates/app/timesheets/index.html',
     controller: 'TimesheetCtrl'
   })
   .otherwise({
     redirectTo: '/projects'
   });
```

### timesheet/client/src/app/employees/controllers.js

```
$scope.requestEmployees = function requestEmployees (page) 
    $control.list('employees')
      .then(function (employees) {
        $scope.employees = employees;
      });
  };

 $scope.remove = function remove (employee) {
    $control.remove('employees', employee) 
      .then(function () {
        console.log('success!');
      })
      .catch(function (x) {
        employee.deleted = false;
        console.log('error : ' + x);
      });
  };

 $scope.restore = function restore (employee) {  
   $control.restore('employees', employee)
      .then(function (restored) {
        console.log('success!');
      })
      .catch(function (x) {
        employee.deleted = true;
        console.log('error : ' + x);
      });
  };

 $scope.requestEmployees(1);
 ```

### timesheet/client/src/app/employees/employees.js

```
$api.add({
	resource: 'employees',
	url: '/users'
});
```

### timesheet/client/src/app/projects/controllers.js

```
$scope.requestProjects = function requestProjects (page) {  
  $control.list('projects')
    .then(function (projects) {
      $scope.projects = projects;
    });
};

$scope.remove = function remove (project) {
  $control.remove('projects', project)
    .then(function (removed) {
      console.log('success !');
    })
    .catch(function (x) {
      project.deleted = false;
      console.log('error : ' + x);
    });
};

$scope.restore = function restore (project) { 
  $control.restore('projects', project) 
    .then(function (restored) {
      console.log('success !');
    })
    .catch(function (x) {
      project.deleted = true;
      console.log('error : ' + x);
    });
};

$scope.requestProjects(1);
```

### timesheet/client/src/app/projects/projects.js

```
$api.add({
  resource: 'projects',
  url: '/projects'
});
```

### timesheet/client/src/app/timesheets/controllers.js

* line 11

```
$control.list('timesheets', query)
     .then(function (timesheets) {
       $scope.timesheets = timesheets;
     });
 ```

* line 17

```
$scope.remove = function remove (timesheet) {
	$control.remove('timesheets', timesheet)
	  .then(function () {
	    console.log('success !');
	  })
	  .catch(function (x) {  
	    timesheet.deleted = false;
	    console.log('error ' + x);
	  });
};

$scope.restore = function restore (timesheet) {
	$control.restore('timesheets', timesheet)
	  .then(function (restored) {
	    console.log('success !');
	  })
	  .catch(function (x) {
	    timesheet.deleted = true;
	    console.log('error ' + x);
	  });
};

$scope.requestTimesheets(1);
```

### timesheet/client/src/app/timesheets/timesheets.js

```
$api.add({
  resource: 'timesheets',
  url: '/users/:user_id/timesheets',
  params: {
    user_id: '@user_id'
  }
});
```

### timesheet/client/test/unit/app/employees/controllers.spec.js

* line 58

```
$httpBackend.when('GET', '/users').respond(200, [{username: 'testUser'}]);
```

* line 62

```
it('should be able to instantiate the controller and request a page of employees', function () { 
  expect(controller).to.be.ok; 
  $httpBackend.expect('GET', '/users');
  $httpBackend.flush();
});
```

* line 71

```
it('should set the result to the employees', function () {
  $httpBackend.expect('GET', '/users');
  $scope.requestEmployees();
  $httpBackend.flush();
  expect($scope.employees[0].username).to.equal("testUser");
}); 
```

* line 82

```
it('should send a remove request for the specified employee', function () {
  $httpBackend.flush();
  $httpBackend.expect('PUT', '/users/' + employee._id).respond(200);
  $scope.remove(employee);
  $httpBackend.flush();
});
```

* line 92

```
$httpBackend.when('PUT', '/users/' + employee._id).respond(200);
```

* line 95

```
it('should set the employee to deleted for the ui', function () {
  $scope.remove(employee);
  $httpBackend.flush();
  expect(employee.deleted).to.be.true;
});
```

* line 105

```
$httpBackend.when('PUT', '/users/' + employee._id).respond(500);
```

* line 108

```
it('should set deleted to false for the employee in the ui', function () {
  $scope.remove(employee);
  $httpBackend.flush();
  expect(employee.deleted).to.be.false;
});
 ```

* line 122

```
it('should send a restore request for the specified employee', function () {
  $httpBackend.flush();
  $httpBackend.expect('PUT', '/users/' + employee._id).respond(200);
  $scope.restore(employee);
  $httpBackend.flush();
});
 ```

* line 132

```
$httpBackend.when('PUT', '/users/' + employee._id).respond(200);
```

* line 135

```
it('should set the employee to not deleted for the ui', function () {
  $scope.restore(employee);
  $httpBackend.flush();
  expect(employee.deleted).to.be.false;
});
```

* line 145

```
$httpBackend.when('PUT', '/users/' + employee._id).respond(500);
```

* line 148

```
it('should set deleted to true for the employee in the ui', function () {
   $scope.restore(employee);
   $httpBackend.flush();
   expect(employee.deleted).to.be.true;
});
```

### timesheet/client/test/unit/app/projects/controllers.spec.js

* line 54

```
$httpBackend.when('GET', '/projects').respond(200, [{name: 'project1'}]);
```

* line 58

```
it('should be able to instantiate the controller and request a page of projects', function () { 
  expect(controller).to.be.ok; 
  $httpBackend.expect('GET', '/projects');
  $httpBackend.flush();
});
```

* line 66

```
it('should set the result to the projects', function () {
  $httpBackend.expect('GET', '/projects');
  $scope.requestProjects();
  $httpBackend.flush();
  expect($scope.projects[0].name).to.equal("project1");
}); 
```

* line 76

```
it('should send a remove request for the specified project', function () {
  $httpBackend.flush();
  $httpBackend.expect('PUT', '/projects/' + project._id).respond(200);
  $scope.remove(project);
  $httpBackend.flush();
});
```

* line 86

```
$httpBackend.when('PUT', '/projects/' + project._id).respond(200);
```

* line 89

```
it('should set the project to deleted for the ui', function () {
  $scope.remove(project);
  $httpBackend.flush();
  expect(project.deleted).to.be.true;
});
```

* line 99

```
$httpBackend.when('PUT', '/projects/' + project._id).respond(500);
```

* line 102

```
it('should set deleted to false for the project in the ui', function () {
  $scope.remove(project);
  $httpBackend.flush();
  expect(project.deleted).to.be.false;
});
```

* line 116

```
it('should send a restore request for the specified project', function () {
  $httpBackend.flush();
  $httpBackend.expect('PUT', '/projects/' + project._id).respond(200);
  $scope.restore(project);
  $httpBackend.flush();
});
```

* line 126

```
$httpBackend.when('PUT', '/projects/' + project._id).respond(200);
```

* line 129

```
it('should set the project to not deleted for the ui', function () {
  $scope.restore(project);
  $httpBackend.flush();
  expect(project.deleted).to.be.false;
});
```

* line 139

```
$httpBackend.when('PUT', '/projects/' + project._id).respond(500);
```

* line 142

```
it('should set deleted to true for the project in the ui', function () {
  $scope.restore(project);
  $httpBackend.flush();
  expect(project.deleted).to.be.true;
});
```

### timesheet/client/test/unit/app/timesheets/controllers.spec.js

* line 68

```
$httpBackend.when('GET', '/users/all/timesheets').respond(200, [{name: 'testTimesheet'}]);
```

* line 72

```
it('should be able to instantiate the controller and request a page of timesheets', function () { 
  expect(controller).to.be.ok; 
  $httpBackend.expect('GET', '/users/all/timesheets');
  $httpBackend.flush();
});
```

* line 81

```
it('should set the result to the timesheets', function () {
  $httpBackend.expect('GET', '/users/all/timesheets');
  $scope.requestTimesheets();
  $httpBackend.flush();
  expect($scope.timesheets[0].name).to.equal("testTimesheet");
});
```

* line 91

```
it('should send a remove request for the specified timesheet', function () {
  $httpBackend.flush();
  $httpBackend.expect('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
  $scope.remove(timesheet);
  $httpBackend.flush();
});
```

* line 101

```
$httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
```

* line 104

```
it('should set the timesheet to deleted for the ui', function () {
  $scope.remove(timesheet);
  $httpBackend.flush();
  expect(timesheet.deleted).to.be.true;
});
```

* line 114

```
$httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(500);
```

* line 117

```
it('should set deleted to false for the timesheet in the ui', function () {
  $scope.remove(timesheet);
  $httpBackend.flush();
  expect(timesheet.deleted).to.be.false;
});
```

* line 131

```
it('should send a restore request for the specified timesheet', function () {
  $httpBackend.flush();
  $httpBackend.expect('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
  $scope.restore(timesheet);
  $httpBackend.flush();
});
```

* line 141

```
$httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(200);
```

* line 144

```
it('should set the timesheet to not deleted for the ui', function () {
  $scope.restore(timesheet);
  $httpBackend.flush();
  expect(timesheet.deleted).to.be.false;
});
```

* line 154

```
$httpBackend.when('PUT', '/users/1234567890/timesheets/' + timesheet._id).respond(500);
```

* line 157

```
it('should set deleted to true for the timesheet in the ui', function () {
  $scope.restore(timesheet);
  $httpBackend.flush();
  expect(timesheet.deleted).to.be.true;
});
```
