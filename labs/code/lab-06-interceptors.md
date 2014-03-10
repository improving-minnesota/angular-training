### timesheet/client/src/interceptors/progress.js

* line 6

```
request : function (config) {
  NProgress.start();
  return $q.when(config);
},
requestError: function (rejection) {
  NProgress.done();
  return $q.reject(rejection);
},
response : function (response) {
  NProgress.done();
  return $q.when(response);
},
responseError: function (rejection) {
  NProgress.done();
  return $q.reject(rejection);
}
```

* line 35

```
$httpProvider.interceptors.push('nProgressInterceptor');
```

### timesheet/client/test/unit/interceptors/progress.spec.js

* line 11

```
'progress.interceptors'
```

* line 15

```
interceptor = $injector.get('nProgressInterceptor');
```

* line 18

```
start : sinon.spy(NProgress, 'start'),
done  : sinon.spy(NProgress, 'done')
```

* line 28

```
spies.start.restore();
spies.done.restore();
```

* line 34

```
it('should start the progress bar', function () {
  interceptor.request(success);
  expect(spies.start).to.have.been.called;
});

it('should return a promise containing the config object', function () {
  var promise = interceptor.request(success);
  expect(promise.then).to.exist;
  expect(promise).to.eventually.equal(success);
});
```

* line 49

```
it('should stop the progress bar', function () {
  interceptor.requestError(rejection);
  expect(spies.done).to.have.been.called;
});

it('should reject the promise with the rejection config', function () {
  var promise = interceptor.requestError(rejection);
  expect(promise).to.have.been.rejectedWith(rejection);
});
```

* line 63

```
it('should stop the progress bar', function () {
  interceptor.response(success);
  expect(spies.done).to.have.been.called;
});

it('should return a promise with the response object', function () {
  var promise = interceptor.response(success);
  expect(promise).to.eventually.equal(success);
});
```

* line 77

```
it('should stop the progress bar', function () {
  interceptor.responseError(rejection);
  expect(spies.done).to.have.been.called;
});
```

* line 82

```
it('should reject the promise with the rejection config', function () {
  var promise = interceptor.responseError(rejection);
  expect(promise).to.have.been.rejectedWith(rejection);
});
```