### timesheet/client/assets/templates/app/employees/form.html

ng-model and ng-click directives

### timesheet/client/assets/templates/app/employees/index.html

ng-click and ui-view directives

* line 5

```
<button class="btn btn-primary btn-block" type="button" ng-click="createNew()">
  <i class="icon-plus"></i>
  New Employee
</button>
```

### timesheet/client/assets/templates/app/index.html

ui-view directive

* line 4

```
<h2>{{$state.current.data.section}}</h2>
```

### timesheet/client/assets/templates/app/navbar.html

* line 10

```
<li ng-class="{active: $state.includes('app.projects')}">
	<a ui-sref="app.projects">Projects</a>
```

* line 13

```
<li ng-class="{active: $state.includes('app.employees')}">
	<a ui-sref="app.employees">Employees</a>
```

* line 16

```
<li ng-class="{active: $state.includes('app.timesheets')}">
	<a ui-sref="app.timesheets({user_id: 'all'})">Timesheets</a>
```

### timesheet/client/assets/templates/app/projects/form.html

ng-click and ng-model directives

### timesheet/client/assets/templates/app/projects/index.html

ng-click and ui-view directives

* line 2

```
<div ng-show="$state.is('app.projects')">
```

* line 5

```
<button class="btn btn-primary btn-block" type="button" ng-click="createNew()">
  <i class="icon-plus"></i>
  New Project
</button>
```

### timesheet/client/assets/templates/app/timesheets/detail.html

ng-click, ng-model, bindings, and ui-view directives

* line 2

```
<div ng-show="$state.is('app.timesheets.detail')">
```

### timesheet/client/assets/templates/app/timesheets/form.html

ng-model and ng-click directives

### timesheet/client/assets/templates/app/timesheets/index.html

ng-click and ui-view directives

* line 2

```
<div ng-show="$state.is('app.timesheets')">
```

* line 5

```
<button class="btn btn-primary btn-block" type="button" ng-click="createNew()">
  <i class="icon-plus"></i>
  New Timesheet
</button>
```

### timesheet/client/assets/templates/app/timesheets/timeunits/form.html

ng-model and ng-click directives

* line 13

```
<option ng-repeat="project in projects" value="{{project.name}}">{{project.name}}</option>
```

* line 21

```
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

### timesheet/client/src/app/app.js

* line 11

```
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

### timesheet/client/src/app/employees/controllers.js

* line 14

```
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

* line 50 

```
$scope.cancel = function cancel () {
  $state.go('app.employees', {}, {reload: true});
};
```

* line 63

```
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

* line 81

```
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

### timesheet/client/src/app/employees/employees.js

* line 6

```
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

### timesheet/client/src/app/projects/controllers.js

* line 14

```
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

* line 49

```
$scope.cancel = function cancel () {
  $state.go('app.projects', {}, {reload: true});
};
```

* line 62

```
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

* line 80

```
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

### timesheet/client/src/app/projects/projects.js

* line 5

```
.config(function ($stateProvider) {
  
 $stateProvider
   .state('app.projects', {
     url: '/projects',
     controller: 'ProjectCtrl',
     templateUrl: 'assets/templates/app/projects/index.html',
     data: {
       section: 'Projects'
     }
   })
 
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
 
   .state('app.projects.create', {
     url: '/create',
     controller: 'ProjectCreateCtrl',
     templateUrl: 'assets/templates/app/projects/form.html',
     data: {
       section: 'Create Project',
       saveText: 'Create'
     }
   });
 })
```

### timesheet/client/src/app/timesheets/controllers.js

* line 8

```
var query = {
  user_id: $stateParams.user_id
};
```

* line 18

```
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

* line 63

```
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

* line 117

```
$scope.saveText = $state.current.data.saveText;
```

* line 120

```
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

* line 131

```
$scope.cancel = function cancel () {
  $state.go('app.timesheets.detail', $stateParams, {reload: true});
};
```

* line 142

```
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

### timesheet/client/src/app/timesheets/timesheets.js

* line 6 

```
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

### timesheet/client/src/app/timesheets/timeunits/controllers.js

* line 7

```
$scope.cancel = function cancel () {
  $state.go('app.timesheets.detail', $stateParams, {reload: true});
};
```

* line 17

```
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

* line 34

```
$scope.timeunit = {
  user_id: $stateParams.user_id,
  timesheet_id: $stateParams._id,
  dateWorked: $scope.timesheet.beginDate
};
```

* line 39

```
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

### timesheet/client/src/app/timesheets/timeunits/timeunits.js

* line 6 

```
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

### timesheet/client/test/unit/app/employees/controllers.spec.js

* line 37

```
state: sinon.stub($state)
```

* line 62

```
$state: spies.state,
  $stateParams: $stateParams
```

* line 91

```
it('should transition to the employee detail state', function () {
  $httpBackend.flush();
  $scope.showDetail(employee);
  expect(spies.state.go).to.have.been.calledWith('app.employees.detail');
});
```

* line 98

```
it('should transition to the create employee state', function () {
  $httpBackend.flush();
  $scope.createNew();
  expect(spies.state.go).to.have.been.calledWith('app.employees.create');
});
```

* line 183

```
it('should return back to the employee list', function () {
  $httpBackend.flush();
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.employees');
});
```

* line 195

```
spies.state.current = {data: {saveText: 'update'}};
```

* line 211

```
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('update');
});
```

* line 215

```
it('should set the employee on scope to the resolved employee', function () {
  expect($scope.employee._id).to.equal(employee._id);
  expect($scope.employee.username).to.equal(employee.username);
});
```

* line 235

```
it('should set the employee on scope to be the updated employee', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.employee.username).to.equal(updatedEmployee.username);
});
```

* line 248

```
spies.state.current = {data: {saveText: 'create'}};
```

* line 263

```
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('create');
});

it('should set the employee on scope to a non admin user', function () {
  expect($scope.employee.admin).to.be.false;
  expect($scope.employee.username).to.be.empty;
});
```

* line 285

```
it('should transition to the detail page of the created employee', function () {
  $scope.save();
  $httpBackend.flush();
  expect(spies.state.go).to.have.been.calledWith('app.employees.detail', {_id: employee._id});
});
```

### timesheet/client/test/unit/app/projects/controllers.spec.js

* line 37

```
state: sinon.stub($state)
```

* line 58

```
$state: spies.state,
  $stateParams: $stateParams
```

* line 84

```
it('should transition to the project detail state', function () {
  $httpBackend.flush();
  $scope.showDetail(project);
  expect(spies.state.go).to.have.been.calledWith('app.projects.detail', project);
});

```

* line 92

```
it('should transition to the create project state', function () {
  $httpBackend.flush();
  $scope.createNew();
  expect(spies.state.go).to.have.been.calledWith('app.projects.create');
});
```

* line 176

```
it('should return back to the project list', function () {
  $httpBackend.flush();
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.projects');
});
```

* line 188

```
$state.current = {data: {saveText: 'update'}};
```

* line 204

```
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('update');
});
```

* line 208

```
it('should set the project on scope to the resolved project', function () {
  expect($scope.project._id).to.equal(project._id);
  expect($scope.project.name).to.equal(project.name);
});
```

* line 228

```
it('should set the project on scope to be the updated project', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.project.name).to.equal(updatedProject.name);
});
```

* line 241

```
$state.current = {data: {saveText: 'create'}};
```

* line 256

```
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('create');
});

it('should set the project on scope to an empy object', function () {
  expect($scope.project).to.be.empty;
});
```

* line 277

```
it('should transition to the detail page of the created project', function () {
  $scope.save();
  $httpBackend.flush();
  expect(spies.state.go).to.have.been.calledWith('app.projects.detail', {_id: project._id});
});
```

### timesheet/client/test/unit/app/timesheets/controllers.spec.js

* line 38

```
$stateParams.user_id = "1234567890";
```

* line 73

```
$state: spies.state,
$stateParams: $stateParams 
```

* line 100

```
it('should transition to the timesheet detail state', function () {
  $httpBackend.flush();
  $scope.showDetail(timesheet);
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail', timesheet);
});
```

* line 108

```
it('should transition to the create timesheet state', function () {
  $httpBackend.flush();
  $scope.createNew();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.create');
});
```

* line 203

```
$state: spies.state,
$stateParams: $stateParams
```

* line 215

```
it('should set the timesheet on scope to the resolved timesheet', function () {
  expect($scope.timesheet._id).to.equal(timesheet._id);
  expect($scope.timesheet.name).to.equal(timesheet.name);
});
```

* line 222

```
it('should transition to the edit state', function () {
  $scope.edit(timesheet);
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail.edit', $stateParams);
}); 
```

* line 229

```
it('should return back to the timesheet list', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets');
});
```

* line 236

```
it('should transition to the create timeunits state', function () {
  $scope.logTime();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail.timeunits.create', $stateParams);
});
```

* line 243

```
it('should set the timeunit_id on state params and transistion to the edit timeunits state', function () {
  $scope.showTimeunitDetail({_id: 'abc'});
  expect($stateParams.timeunit_id).to.equal('abc');
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail.timeunits.edit');
});
```

* line 321

```
spies.state.current = {data: {saveText: 'update'}};
```

* line 336

```
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('update');
});

it('should set the timesheet on scope to the resolved timesheet', function () {
  expect($scope.timesheet._id).to.equal(timesheet._id);
  expect($scope.timesheet.name).to.equal(timesheet.name);
});
```

* line 360 

```
it('should set the timesheet on scope to be the updated timesheet', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.timesheet.name).to.equal(updatedTimesheet.name);
});
```

* line 370

```
it('should return back to the timesheet detail', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail');
});
```

* line 380

```
spies.state.current = {data: {saveText: 'create'}};
```

* line 395

```
it('should set saveText to the current state saveText', function () {
  expect($scope.saveText).to.equal('create');
});
```

* line 416

```
it('should transition to the detail page of the created timesheet', function () {
  $scope.save();
  $httpBackend.flush();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail', {user_id: $stateParams.user_id, _id: timesheet._id});
});
```

* line 425

```
it('should return back to the timesheet list', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets');
});
```

### timesheet/client/test/unit/app/timesheets/timeunits/controllers.spec.js

* line 37

```
$stateParams.user_id = "1234567890";
$stateParams._id = "asdfghjklqwerty";
```

* line 54

```
"user_id": $stateParams.user_id
```

* line 58

```
state: sinon.stub($state)
```

* line 82

```
it('should set the resolved list of projects on scope', function () {
  expect($scope.projects).to.equal(projects);
});

```

* line 88

```
it('should return back to the timesheet detail', function () {
  $scope.cancel();
  expect(spies.state.go).to.have.been.calledWith('app.timesheets.detail');
});
```

* line 111

```
it('should attach the resolved timeunit onto scope', function () {
  expect($scope.timeunit._id).to.equal(timeunit._id);
});
```

* line 130

```
it('should set the timeunit on scope to be the updated timeunit', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.timeunit.name).to.equal(updatedTimeunit.name);
});
```

* line 155

```
it('should initialize a new timeunit with user and timesheet ids', function () {
  expect($scope.timeunit.user_id).to.equal($stateParams.user_id);
  expect($scope.timeunit.timesheet_id).to.equal($stateParams._id);
});
```

* line 175

```
it('should set the timeunit on scope to be the updated timeunit', function () {
  $scope.save();
  $httpBackend.flush();
  expect($scope.timeunit.name).to.equal(updatedTimeunit.name);
});
```































