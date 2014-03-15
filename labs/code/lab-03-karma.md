# Lab Three - Unit Testing with Karma

### Gruntfile.js

* line 189

```javascript
tasks: ['development', 'karma:unit:run']
```

* line 199

```javascript
tasks: ['debug', 'karma:unit:run']
```

* line 209

```javascript
tasks: ['production', 'karma:unit:run']
```

* line 370

```javascript
karma : {
  unit : {
    reporters: 'dots',
    configFile: 'karma.config.js',
    options: {
      background: true
    }
  }
}
```

### timesheet/client/test/unit/app/controllers.spec.js

* line 8

```javascript
beforeEach(
 module(
   'app.controllers'
 ));

describe('MainCtrl', function() {
 beforeEach(inject(function($rootScope, $controller) {
   scope = $rootScope.$new();
   controller = $controller("MainCtrl", {
     $scope: scope
   });
 }));

 describe('setup', function () {
   it('should be able to instantiate the controller', function () {
     expect(controller).to.be.ok;
   });
 });
});
```

* line 30

```javascript
beforeEach(inject(function($rootScope, $controller) {
  scope = $rootScope.$new();
  controller = $controller("AppCtrl", {
    $scope: scope
  });
}));
```

* line 38

```javascript
it('should be able to instantiate the controller', function () {
	expect(controller).to.be.ok;
});
```

* line 46

```javascript
beforeEach(inject(function($rootScope, $controller) {
  scope = $rootScope.$new();
  controller = $controller("NavCtrl", {
    $scope: scope
  });
}));
```

* line 54

```javascript
it('should be able to instantiate the controller', function () {
  expect(controller).to.be.ok;
});
```

### timesheet/karma.config.js

* line 4

```javascript
frameworks: ['jasmine'],
```

* line 29

```javascript
browsers: ['Chrome'],
```
