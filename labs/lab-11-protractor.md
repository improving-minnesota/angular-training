# Lab Eleven - End to End testing using Protractor

&nbsp;
## Checkout the Lab Branch
- In a console:

```
git checkout lab-11-protractor
git pull
```

&nbsp;
## Install ChromeWebDriver

### Set up web driver to manipulate the browser for us
* We need to set up the Chrome web driver for Protractor to run our tests.
* In a console window, within the `timesheet` home directory, run:

```
./node_modules/protractor/bin/webdriver-manager update
```

* You should see output in your console that the chromedriver zip file was dowloaded.

&nbsp;
## Grunt configuration

### Configure the `grunt-protractor-runner` task.

* Open `Gruntfile.js` and find the `TODO` around line #400.

###### Set these options :
* Keep the process alive (our watch task) even if a test fails.
* Use color output to the console to make it look neat.
* If we run the debug task, let us stop the execution in the browser to inspect our code in Chrome developer tools.

* The configuration should look like below:

```javascript
protractor: {
  options: {
    configFile: 'protractor.config.js',
    keepAlive: true,
    noColor: false
  },
  e2e: {
  },
  debug: {
    options: {
      debug: true
    }
  }
}
```
&nbsp;
### Register the `grunt-protractor-runner`

* In the open `Gruntfile.js` find the `TODO` around line #468.
* We need to register the task that was installed via NPM.
* Enter the below javascript to register the task.

```javascript
grunt.loadNpmTasks('grunt-protractor-runner');
```

&nbsp;
### Test the Grunt task has been registered.
* In a console window, run:

```
grunt protractor:e2e
```

&nbsp;
## Protractor configuration

### Let's register the tests that we will write together
* We first need to configure Protractor to find and run our tests.
* Since these tests actually use the server and make api calls, we need to make sure that our security tests run first so that we are logged in.
* Open `protractor.config.js` and look for the `TODO` around line 18.
* We're going to be writing tests for the security, employees, and projects modules.
* Enter the below in our configuration so that Protractor knows what tests to run:

```javascript
'client/test/e2e/security/security.spec.js',
'client/test/e2e/app/employees/*.spec.js',
'client/test/e2e/app/projects/*.spec.js'
```
### Test the Configuration
* Start the application server by running:

```
grunt runapp:development
```

* In a **separate** console window, run the Grunt protractor task:

```
grunt protractor:e2e
```

* You should get output in your console similar to:

```javascript
Running "protractor:e2e" (protractor) task

------------------------------------
PID: 68767 (capability: chrome #1)
------------------------------------

Using ChromeDriver directly...


Finished in 0.004 seconds
0 tests, 0 assertions, 0 failures


Done, without errors.
```

&nbsp;
## Security Tests

### Let's write our first tests!!

* Open the security e2e spec at `client/test/e2e/security/security.spec.js`
* You'll notice that in the `beforeEach` we navigate to application root as the first step using `browser.get('/');`
* The next thing we need to do in our tests is get the instance of *Protractor* so that we can use it to test the status of our web page.
* Find the `TODO` around line #7 and assign the `ptor` variable to the global `protractor` instance that is created by the test runner.

```javascript
ptor = protractor.getInstance();
```

* OK, now we're ready to write some tests.

###### Test redirect to login page
* First let's make sure that when a user first navigates to the application, they are redirected to the login state.
* Find the `TODO` and enter the test below :

```javascript
it('should be redirected to the login state', function () {
  var loginForm = by.name('loginForm');
  expect(ptor.isElementPresent(loginForm)).toBe(true);
});
```
* You'll notice that we set up a locator for the login form on the page by searching for its name, 'loginForm'.
* Then we ask Protractor if that element exists on the page. Simple right?
* Run the Grunt protractor test again and check out the results.
* You should see that it ran 1 test with 1 assertion and 0 failures.
* Did you notice Chrome starting and being manipulated by the web driver?

###### Test login
* Now let's make sure that we can login to the application
* Protractor lets us find elements on the page by the model they are bound to with the `by.model` locator.
* After the redirect test, enter the below specification:

```javascript
it('should be able to login', function () {
  element(by.model('user.username')).sendKeys('admin');
  element(by.model('user.password')).sendKeys('password');
  element(by.css('form button')).click();

  browser.sleep(1.0);

  var logout = by.css('a.logout');
  expect(ptor.isElementPresent(logout)).toBe(true);
});
```
* Run the tests with the grunt protractor task and check out the results.
* Did both tests pass?

&nbsp;
## Page Objects

* In order to make end to end testing more simple, the Angular team recommends that we use page objects to encapsulate the actions that we want the web driver make on the page.

### Test clicking the new employee button

* Open the **client/test/e2e/app/employees/index.page.js** that was created for you by your teammates.
* Look at the existing code and notice:
  * A `get()` function has been implemented that will navigate to the Employees index page.
  * Properties for the page title, new employee button, and first row in the employee table have been provided.
  * A function to find the page title has been implemented for you.


* First let's create a function that will click the new employee button.
* Around line #13, find the `TODO` and enter the code below:

```javascript
this.clickNewEmployee = function () {
  this.newEmployeeButton.click();
};
```

* Yes, it's that easy.

* Now we need to set up the employee form page object so that we can verify that clicking the new employee button actually takes us to that page.
* Open **client/test/e2e/app/employees/form.page.js**.
* Around line #4, add the `pageTitle` property and function to retrieve it.

```javascript
this.pageTitle = element(by.binding('$state.current.data.section'));
this.getPageTitle = function () {
  return this.pageTitle.getText();
};
```

* Now let's write the test that actually uses it.

* Open **client/test/e2e/app/employees/employees.spec.js**.
* Find the `TODO` around line #15 and enter the test below:

```javascript
it('takes us to the create employee form', function () {
  indexPage.clickNewEmployee();
  expect(formPage.getPageTitle()).toBe("Create Employee");
});
```

* Before we run the test, let's look at the set up that happens.
  * Notice that we are importing the index and form page objects using Node's `require()`.
  * At line #8, we are calling `indexPage.get()` which navigates to the employee index page.
  * We are also getting an instance of the `protractor` global.
* Now run the tests with `grunt protractor:e2e`
* Did you see that protractor runs the login tests first and then the employees tests?
* Did all the tests pass? If not, make sure that you don't have any typos and run the tests again.

&nbsp;
## Test actions on the employee table

* Now let's finish up setting up the employee index page object by adding the below functions to click on the first row and click on the delete or restore button.
* Open the **client/test/e2e/app/employees/index.page.js**
* Around line #18, find the `TODO` and add the below functions to the page object constructor function:

```javascript
this.clickFirstEmployee = function () {
  this.firstEmployee.click();
};
this.deleteFirstEmployee = function () {
  this.firstEmployee.findElement(by.buttonText('Delete')).click();
};
this.restoreFirstEmployee = function () {
  this.firstEmployee.findElement(by.buttonText('Restore')).click();
};
```

* Now we can write the tests that use these new functions on the page object.
* Open **client/test/e2e/app/employees/employees.spec.js**
* Find the `TODO`s at the following line numbers and enter these tests:
  * After you enter each test, run the grunt protractor test to see the results.


### Navigating to the create employee form
 - Locate the `TODO` near line 15.
- Test that we actually go to the create employee form.
  - Use the `indexPage` page object to click the new employee button.
  - Verify that the page title is now "Create Employee".  

```javascript
it('takes us to the create employee form', function () {
  indexPage.clickNewEmployee();
  expect(formPage.getPageTitle()).toBe("Create Employee");
});
```

### Navigating to the employee detail page
- Locate the `TODO` near line 22.
- Test clicking the first employee in the table takes us to the detail page.
- Use the `indexPage` page object to click the first employee in the list.
- Verify that the page title is now "Update Employee".

```javascript
it('takes us to the employee detail page', function () {
  indexPage.clickFirstEmployee();
  expect(formPage.getPageTitle()).toBe("Update Employee");
});
```

### Deleting an employee
- Locate the `TODO` near line 30.
- Test that removing an employee changes the styling of its row.
  - Use the `indexPage` page object to delete the first employee.
  - Verify that the first employee now has a class : 'faded'.

```javascript
it('should fade the employee row', function () {
  indexPage.deleteFirstEmployee();
  expect(indexPage.firstEmployee.getAttribute('class')).toContain('faded');
});
```

- Locate the `TODO` near line 35.
- Test that the button's text changes when an employee is deleted.

> Since we have not reset the page state since the last test, the first employee should
> still be 'deleted'. Remember in functional testing, the web driver is just taking place
> of an actual user so your view will remain exactly as your last test left it.

```javascript
it('should change the action button text', function () {
  expect(indexPage.firstEmployee.element(by.buttonText('Restore')).isPresent()).toBe(true);
});
```

### Restoring an employee
- Locate the `TODO` near line 42.
- Test what happens when we click the 'restore' button on the first employee.
  - Use the `indexPage` page object to click the restore button.
  - Verify that the 'faded' class was removed from the row.

```javascript
it('should set the row back to normal', function () {
  indexPage.restoreFirstEmployee();
  expect(indexPage.firstEmployee.getAttribute('class')).not.toContain('faded');
});
```

- Locate the `TODO` near line 47.
- Test the button text is reset to 'Delete'.

```javascript
it('should restore the action button text', function () {
  expect(indexPage.firstEmployee.element(by.buttonText('Delete')).isPresent()).toBe(true);
});
```
&nbsp;
## Testing the employee form page


* First let's set up the employee form page to let us cancel the form during our tests.
* Open **client/test/e2e/app/employees/form.page.js**
* Around line #14, find the `TODO` and add the following function to the page object:

```javascript
this.cancelForm = function () {
  this.cancelButton.click();
};
```

* Did you notice that your teammates already created a lot of the form page for you?
  * Look it over and make sure you understand what is happening.
* Open **client/test/e2e/app/employees/employees.spec.js**
* Find the `TODO` around line #60 and enter the following tests:

```javascript
it('should be able to update the employee', function () {

  formPage
    .enterValue('employee.firstName', 'newName')
    .saveForm('Update');

  browser.sleep(2);

  expect(formPage.successMessage()).toContain('Updated employee:');
});

it('should return back to the index page on cancel', function () {
  formPage.cancelForm();
  expect(indexPage.getPageTitle()).toBe("Employees");
});
```
* Run the tests with the grunt task and check your results.

&nbsp;
## Debugging Protractor tests in the browser

* Keep the **employees.spec.js** file open and enter `browser.debugger()` inside any of the form tests you just wrote.
* Now run your tests, but this time use:

```
grunt protractor:debug
```

* Wait for the Chrome browser to open and stop.
* It's just like you're running it like normal, except that you are in the state that your test left the browser in.
* You can actually use the Protractor library from within your Chrome console.
* Open the console and type:

```
window.clientSideScripts.findInputs('username');
```
* Pretty neat, huh?
* see the docs at https://github.com/angular/protractor/tree/master/docs for more info on this.

&nbsp;
## Practice, Practice, Practice

### Using the employees.spec.js as a guide, implement the end to end tests for the Projects module.
* Open **timesheet/client/test/e2e/app/projects/projects.spec.js**
* Find the `TODOs` and implement the tests.
* If you get stuck, the below code is here to help, but please no copy/paste coding.

```javascript
describe("clicking new project", function () {
    it('takes us to the create project form', function () {
      indexPage.clickNewProject();
      expect(formPage.getPageTitle()).toBe("Create Project");
    });
  });

  describe("selecting a project", function () {
    it('takes us to the project detail page', function () {
      indexPage.clickFirstProject();
      expect(formPage.getPageTitle()).toBe("Project Details");
    });
  });

  describe("deleting a project", function () {

    it('should fade the project row', function () {
      indexPage.deleteFirstProject();
      expect(indexPage.firstProject.getAttribute('class')).toContain('faded');
    });

    it('should change the action button text', function () {
      expect(indexPage.firstProject.element(by.buttonText('Restore')).isPresent()).toBe(true);
    });
  });

  describe("restoring a project", function () {

    it('should set the row back to normal', function () {
      indexPage.restoreFirstProject();
      expect(indexPage.firstProject.getAttribute('class')).not.toContain('faded');
    });

    it('should restore the action button text', function () {
      expect(indexPage.firstProject.element(by.buttonText('Delete')).isPresent()).toBe(true);
    });
  });
});

describe('Form Page', function () {

  describe('Update Project Form', function () {
    beforeEach(function () {
      indexPage.clickFirstProject();
    });

    it('should be able to update the project', function () {

      formPage
        .enterValue('project.name', 'newProjectName')
        .saveForm('Update');

      browser.sleep(2);

      expect(formPage.successMessage()).toContain('Updated project: ');
    });

    it('should return back to the index page on cancel', function () {
      browser.debugger();
      formPage.cancelForm();
      expect(indexPage.getPageTitle()).toBe("Projects");
    });
  });

});
```

### Commit your code to git and celebrate!!!
```
git add .
git commit -m 'Whew...we made it and we are awesome!'
```
