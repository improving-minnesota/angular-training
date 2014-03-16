# Lab Three - Unit Testing with Karma

&nbsp;
## Checkout the Lab Branch
- In a console:

```
git checkout lab-3-karma
```
&nbsp;
## Karma Configuration

- We need to set up our `karma` configuration so that we can unit test our code as we write it.
- Open **karma.config.js**
- Most of the configuration has been started for you by your teammates, we just have a couple more configurations needed:

### Add the Jasmine framework

- Locate the `TODO` near line #4 and add the `jasmine` framework :

```javascript
frameworks: ['jasmine'],
```

### Configure Chrome

- We want `karma` to run our tests through the Chrome browser so that we have access to dev tools while running our tests.
- Find the `TODO` located near line #29 and register the Chrome browser via :

```javascript
browsers: ['Chrome'],
```

- Now that we have `karma` configured, we need to set up the Grunt task to run it during our build process.

&nbsp;
## Karma Grunt Task

- Now let's configure the `grunt-karma-runner` to run our tests.
- Open **Gruntfile.js**
- Your teammates have been so kind as to handle some work up front for you:
  - Set the NPM package for the `Grunt` task as dependency in `package.json`.
  - Imported the task into your `Grunt` configuration so that it is available.

- Locate the `TODO` near line #370 and configure the task:

```javascript
karma : {
  unit : {
    reporters: 'dots',
    configFile: 'karma.config.js'
  }
}
```
- Now, open a console and try running:

```
grunt karma:unit
```

- What does the output say? Did it have any tests to run?

- Now that we have `karma` up and running, let's write some tests!

&nbsp;
## Writing Your First Tests

- We're going to write a couple of tests to verify that we can instantiate the application's main controllers.
- Open **client/test/unit/app/controllers.spec.js**.

###### Test the MainCtrl
- Locate the `TODO` near line #9 and replace it the mock module instantiation:

```javascript
beforeEach(
 module(
   'app.controllers'
 ));
```
- Next follow the instructions from the `TODO` near line 14 and add:

```javascript
beforeEach(inject(function($rootScope, $controller) {
  scope = $rootScope.$new();
  controller = $controller("MainCtrl", {
    $scope: scope
  });
}));
```

 - Then find the `TODO` near line #20, to write your first test:

```javascript
describe('setup', function () {
  it('should be able to instantiate the controller', function () {
    expect(controller).to.be.ok;
  });
});
```
- So what did we do here?
  - In our first `beforeEach` block, we ask Angular to set up a mock module of `app.controllers`.
  - Inside the `beforeEach` block of our "MainCtrl" test:
    - We ask Angular to inject `$rootScope` and `$controller` via the `inject()` function.
    - We create a new `scope` object by calling `$rootScope.$new()`
    - Then we use that `scope` object to construct our test controller via the `$controller` service.
  - In our test, we verify that we can actually create an instance of "MainCtrl"


- The rest of our controller tests will use the same pattern.

###### Set up a development cycle
- In a new console window, run:
```
grunt watch:development`
```

- This task watches for changes to your source code and runs the `development` task.

- If the `karma` task isn't running, start it now with:
```
grunt karma:unit
```

- This task will run in the background, wait for the `watch` task to complete, and run the tests for you automatically.

##### If you have any test failures at this point, go back and troubleshoot the previous specs.

###### Test the AppCtrl

- Find the `TODO` near line #30 and set up the controller for testing:

```javascript
beforeEach(inject(function($rootScope, $controller) {
  scope = $rootScope.$new();
  controller = $controller("AppCtrl", {
    $scope: scope
  });
}));
```

- Now test the controller can be instantiated by replacing the `TODO` near line 38 with:

```javascript
it('should be able to instantiate the controller', function () {
	expect(controller).to.be.ok;
});
```

- Check that your tests are still all passing!


### Verify All Tests are Passing
- Are all of the tests still passing? Any failures? If not, let's keep moving!!

### Investigate Debug Mode in Chrome

###### Chrome Debug Mode
- Open the Chrome browser that is currently being controlled by `karma` and click the `Debug` button.
- Open Chrome dev tools with `ctrl-alt-i` or `cmd-option-i`
- Open the javascript console and refresh the page.
- You can see that `karma` is running your unit tests right in the browser.


###### Debug your tests
- Now open the `Sources` tab and open your `controllers.spec.js`.
- Place a break point in your first test, right at the line : `expect(controller).to.be.ok;`.
- Refresh the browser again.
- Notice how the test execution stops at that line of code.
- This becomes very handy when we start implementing more complicated tests and is a good tool to keep in your belt.

### Stop all consoles with `ctrl-c` and get ready for the next labs. 
