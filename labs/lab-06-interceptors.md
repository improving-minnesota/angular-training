# Lab Six - Interceptors

&nbsp;
## Checkout the Lab Branch
- In a console:

```
git checkout lab-6-interceptors
git pull
```
&nbsp;
##### Start the grunt tasks: `karma:unit`, `watch:development`, and `grunt serve:development` in separate consoles.

&nbsp;
## Create a Progress Bar for API Calls

### The Situation
- Our vigilant product owners are concerned that our users do not have any visual feedback to how long it is taking to complete server side tasks.
- To resolve this, we have been tasked with creating a progress bar and spinner graphic to give feedback to the user.
- After a quick planning session, we've decided to use the *NProgress.js* library.
- *NProgress* only needs to be notified of when to start and stop.
- This is a perfect case for using a custom interceptor.

- The requirements of our progress interceptor:
  - When the request is made, we should start the progress spinner.
  - If there is an error during the request, stop the spinner.
  - When the response has returned, we need to stop the spinner.
  - If there is an error in the response, stop the spinner.


- An interceptor expects us to implement any of four life cycle event callback:
  - `request` : Called when the request is made.
  - `requestError` : Called if there is an error in making the request.
  - `response` : Called when the response is received.
  - `responseError` : Called if the response returns an error.


### Create the nProgressInterceptor

- Open **client/src/interceptors/progress.js**
- Locate the `TODO` near line #6 and add the following:

```javascript
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

- What did we just do?
  - Since interceptors work by either resolving or rejecting promises, the `$q` service has been injected for you.
  - In each of the life cycle callbacks:
    - If there is no error, we are calling `$q.when()` so that any other interceptors will also be called and, eventually, the success handlers.
    - If there is an error, we are calling `$q.reject()` so that Angular knows to call the error handlers.


- Now we need to add the interceptor into the `$httpProvider` interceptors array.
- Since it is in a configuration block, we need to use the provider, not the service instance.
- Locate the `TODO` near line #35 and register the interceptor.

```javascript
$httpProvider.interceptors.push('nProgressInterceptor');
```
- Pretty simple, huh?
- Now let's test it out.

### Testing our custom interceptor

- Open **client/test/unit/interceptors/progress.spec.js**

###### Add the dependency

- We need to add our new interceptor's module so that it is available in our tests.
- Locate the `TODO` near line #11 and add the dependency:

```javascript
'progress.interceptors'
```

###### Inject the interceptor
- We also need to inject our interceptor so that it can be tested.
- Find the `TODO` near line #15 and inject the interceptor:

```javascript
interceptor = $injector.get('nProgressInterceptor');
```

###### Create spies for the NProgress library
- Since our interceptor calls a third party api, we need to verify that these calls actually get made.
- We need to create spies via the excellent **sinon** library.
- Locate the `TODO` near line #18 and create the spies for `start()` and `done()`:

```javascript
start : sinon.spy(NProgress, 'start'),
done  : sinon.spy(NProgress, 'done')
```
- This tells *sinon* to listen for the function calls, keep track of the statistics, and make them available to us in our tests.


###### Refresh the spies after each test
- Since we want to start each test with fresh statistics, we also need to restore each spy after each test has completed.
- Locate the `TODO` near line #28 and add:

```javascript
spies.start.restore();
spies.done.restore();
```

###### Test a successful request
- Now it's time to verify the behavior of a successful request.
- Locate the `TODO` near line #34 and test the start of the progress bar:
  - Call the request callback and pass in the `success` configuration object.
  - Verify that the `start()` function on the `NProgress` global was called (using `sinon`).

```javascript
it('should start the progress bar', function () {
  interceptor.request(success);
  expect(spies.start).to.have.been.called;
});
```

- This test calls the request method on our interceptor and makes sure that `NProgress.start()` was called.
- We are also making use of the *chai* matcher library to verify that the spy was **called**.


- Now let's verify that our promise resolves as expected
- Right below the above test, add:

```javascript
it('should return a promise containing the config object', function () {
  var promise = interceptor.request(success);
  expect(promise.then).to.exist;
  expect(promise).to.eventually.equal(success);
});
```
- What did we just do?
- In this test, we are doing 3 things:
  - Calling the `request` method on our interceptor and assigning the result to a variable, *promise*.
  - Verifying that the promise is actually a `$q.promise` by testing that `then()` exists.
  - Use the `chai-as-promised` library to verify that the promise eventually resolves.


- Run the tests via `grunt karma:unit` and see the results.
- Did they all pass?

###### Test an error in the request
- Now that we have tested a successful request, let's make sure a request with an error behaves like we expect.
- Locate the `TODO` near line 49 and add:

- Test that the progress bar stops if there is an error in the request.
  - Call the `requestError` callback and pass in the `rejection` test object.
  - Verify that the `NProgress.done()` was called via the `sinon` spy.

```javascript
it('should stop the progress bar', function () {
  interceptor.requestError(rejection);
  expect(spies.done).to.have.been.called;
});
```

- Test that the promise is rejected when the request has an error.
  - Call `requestError` callback and set its result to a variable, `promise`.
  - Verify that the `promise` was rejected with the rejection test object.

```javascript
it('should reject the promise with the rejection config', function () {
  var promise = interceptor.requestError(rejection);
  expect(promise).to.have.been.rejectedWith(rejection);
});
```

- Notice that we are using `chai-as-promised`'s `rejectedWith()` to test for a rejected promise?
- Could you imagine the amount of code it would take to wrap the promise and test for rejection?
- I love libraries that make our jobs easier, don't you?


- Run and verify your tests.

###### Test a successful response
- OK, now that we have tested the request lifecycle, let's move on to responses.
- Locate the `TODO` near line #63 and add tests for success responses:


- Verify that the progress bar is stopped.
  - Call the interceptor's `response` callback with the success test object.
  - Verify that the `done()` function was called via your `sinon` spy.

```javascript
it('should stop the progress bar', function () {
  interceptor.response(success);
  expect(spies.done).to.have.been.called;
});
```
- Test that a promise is returned with the successful response.
  - Call the `response()` callback again and assign its result to a variable named `promise`.
  - Verify that the promise is ***eventually*** called.

```javascript
it('should return a promise with the response object', function () {
  var promise = interceptor.response(success);
  expect(promise).to.eventually.equal(success);
});
```
- Nothing really new here, just business as usual.
- Run and verify that your tests are passing before moving on.

###### Test a response containing an error
- Time to test an error in our response.
- Locate the `TODO` near line #77 and add this test

- Test the progress bar is stopped with an error
  - Call the `responseError()` function and pass in the `rejection` test object.
  - Verify that the `done()` function was called on `NProgress`. (via its spy, `spies.done`)

```javascript
it('should stop the progress bar', function () {
  interceptor.responseError(rejection);
  expect(spies.done).to.have.been.called;
});
```

- And at the `TODO` near line #82:
- Test the promise is also rejected when the response has an error.
  - Call the `responseError()` callback and assign its result to a variable, `promise`.
  - Verify that the ***promise*** was rejected with the rejection test object.

```javascript
it('should reject the promise with the rejection config', function () {
  var promise = interceptor.responseError(rejection);
  expect(promise).to.have.been.rejectedWith(rejection);
});
```

- Run and verify your tests...are you noticing a pattern?

&nbsp;
### Set the Interceptor Module as a Dependency for the Application
- Now all we have to do is make sure that the module is loaded when Angular is booting up.
- This will make it available to the entire application.

- Open **client/src/main.js** and set our new module as a dependency:

```javascript
  'progress.interceptors',
```

&nbsp;
## See Your Interceptor in Action

- Open your browser and navigate to : http://localhost:3000
- Navigate to the different list pages and watch for your spinner and progress bar.
- Do you see it working now?

&nbsp;
### Commit your work to Git
```
git add .
git commit -m 'Cool interceptor badge acquired!!'
```
