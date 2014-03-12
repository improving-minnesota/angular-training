### timesheet/client/src/app/controllers.js

```JavaScript
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

### timesheet/client/src/main.js

```JavaScript
angular.module('main', [
  'templates-main',
  'templates-lib',
  'app'
])

.run(function ($log) {
  $log.info("Application running.");
});
 ```