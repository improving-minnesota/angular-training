```
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

```
angular.module('main', [
  'templates-main',
  'templates-lib',
  'app'
])

.run(function ($log) {
  $log.info("Application running.");
});
 ```