### timesheet/Gruntfile.js

```JavaScript
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
},
```

```JavaScript
grunt.loadNpmTasks('grunt-protractor-runner');
```

### timesheet/client/test/e2e/app/employees/employees.spec.js

* line 15

```JavaScript
it('takes us to the create employee form', function () {
  indexPage.clickNewEmployee();
  expect(formPage.getPageTitle()).toBe("Create Employee");
});
```

* line 22

```JavaScript
it('takes us to the employee detail page', function () {
  indexPage.clickFirstEmployee();
  expect(formPage.getPageTitle()).toBe("Update Employee");
});
```

* line 30

```JavaScript
it('should fade the employee row', function () {
  indexPage.deleteFirstEmployee();
  expect(indexPage.firstEmployee.getAttribute('class')).toContain('faded');
});
```

* line 35

```JavaScript
it('should change the action button text', function () {
  expect(indexPage.firstEmployee.element(by.buttonText('Restore')).isPresent()).toBe(true);
});
```

* line 42

```JavaScript
it('should set the row back to normal', function () {
  indexPage.restoreFirstEmployee();
  expect(indexPage.firstEmployee.getAttribute('class')).not.toContain('faded');
});
```

* line 47

```JavaScript
it('should restore the action button text', function () {
  expect(indexPage.firstEmployee.element(by.buttonText('Delete')).isPresent()).toBe(true);
});
```

* line 60

```JavaScript
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

### timesheet/client/test/e2e/app/employees/form.page.js

* line 4

```JavaScript
this.pageTitle = element(by.binding('$state.current.data.section'));
this.getPageTitle = function () {
  return this.pageTitle.getText();
};
```

* line 14

```JavaScript
this.cancelForm = function () {
  this.cancelButton.click();
};
```

### timesheet/client/test/e2e/app/employees/index.page.js

* line 13

```JavaScript
this.clickNewEmployee = function () {
  this.newEmployeeButton.click();
};
```

* line 18

```JavaScript
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

### timesheet/client/test/e2e/app/projects/projects.spec.js

```JavaScript
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

### timesheet/client/test/e2e/security/security.spec.js

* line 7

```JavaScript
ptor = protractor.getInstance();
```

* line 10

```JavaScript
it('should be redirected to the login page', function () {
  var loginForm = by.name('loginForm');
  expect(ptor.isElementPresent(loginForm)).toBe(true);
});

it('should be able to login', function () {
  element(by.model('user.username')).sendKeys('admin');
  element(by.model('user.password')).sendKeys('password');
  element(by.css('form button')).click();

  browser.sleep(1.0);

  var logout = by.css('a.logout');
  expect(ptor.isElementPresent(logout)).toBe(true);
});
```

### timesheet/protractor.config.js

```JavaScript
'client/test/e2e/security/security.spec.js',
'client/test/e2e/app/employees/*.spec.js',
'client/test/e2e/app/projects/*.spec.js'
```
