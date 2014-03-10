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

# timesheet/client/src/app/projects/projects.js

```
$api.add({
  resource: 'projects',
  url: '/projects'
});
```

# timesheet/client/src/app/timesheets/controllers.js

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

# timesheet/client/src/app/timesheets/timesheets.js

```
$api.add({
  resource: 'timesheets',
  url: '/users/:user_id/timesheets',
  params: {
    user_id: '@user_id'
  }
});
```

# timesheet/client/test/unit/app/employees/controllers.spec.js























