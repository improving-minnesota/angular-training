# Lab Nine - Filters

&nbsp;
## Checkout the lab branch

- In your console:

```
git checkout lab-9-filters
git pull
```
&nbsp;
##### Start the grunt tasks
```
grunt karma:unit
```
```
grunt watch:development
```
```
grunt serve:development
```

&nbsp;
## Using an Angular provided filter to sort our tables.

- Let's use Angular's `orderBy` filter to sort the data displayed in our tables.

###### Sort the employee table by username
- Open **client/assets/templates/app/employees/index.html**
- Find the `<tr>` that is holding our repeater and change the `ng-repeat` directive to be:

```javascript
ng-repeat="employee in employeeCtrl.pageConfig.data | orderBy:'username'"
```
- Now run the server (if it isn't already) and your grunt watch task.
- Open the application in the browser and navigate to the employees page.
- Are the employees now sorted by username?

- Now let's do the rest of our tables:

###### Sort the projects by the project name
```javascript
ng-repeat="project in projectCtrl.pageConfig.data | orderBy:'name'"
```

###### Sort the timesheets by begin date

```javascript
ng-repeat="timesheet in timesheetCtrl.pageConfig.data | orderBy:'beginDate'"
```

###### Sort the timeunits by date worked

```javascript
ng-repeat="timeunit in timesheetDetailCtrl.timeunits | orderBy:'dateWorked'"
```
- Replace each of the `ng-repeat` declarations in the `<tr>`'s and navigate to each of the pages to see the effects.
- Pretty nice and easy to handle something that is very common.

- Now let's look at how simple it is to create our own custom filters!

&nbsp;
## Boolean Filter

### The situation
- Management has come to us and asked if we could display **Yes** or **No** for **True** or **False** on whether or not an employee is an admin user.
- After consideration, we've decided that instead of changing the data from true/false, we will create a filter to display the values we want.
- This gives us flexibility down the road, if/when our management changes their mind again.
- These are our requirements:
  - When the value is **true**, display **Yes**.
  - When the value is **false**, display **No**.
  - When the value is not a boolean, display **N/A**.

### Create the boolean.filters module

- Open **client/src/filters/boolean.js**
- Create the Angular module at the top of the page.

```javascript
angular.module('boolean.filters', [ ])
```
- Now we can register a new filter with the **boolean.filters** module.
- Enter this code below your module declaration

```javascript
  .filter('yesNo', function() {
    return function(value) {
      if (_.isBoolean(value)) {
        if (value) {
          return 'Yes';
        } else {
          return 'No';
        }
      } else {
        return 'N/A';
      }
    };
  });
```

&nbsp;
### Write the unit tests

- Well we have code that we think works, but we have to make sure.
- First thing we need to do is write the unit tests to verify that we will meet our requirements.
- Open **client/test/unit/filters/boolean.spec.js**
- Locate the `TODO` near line #4 and make sure that our **boolean.filters** module is instantiated before each test is run.

```javascript
beforeEach(module('boolean.filters'));
```

- This tells Karma to fire up a module and set our boolean filters as a dependency.
- Now let's inject our filter so that we can test it.
- Find the `TODO` near line #10 and enter the below code:

```javascript
yesNoFilter = $injector.get('yesNoFilter');
```
- With this line of code, we are asking the injector service to grab our filter and assign it to our variable.
- Now we can write our tests!!
- Write each of the below tests, start Karma, and verify they all pass.

###### Test it will display Yes for true

```javascript
it('should display "Yes" for boolean true', function() {
  expect(yesNoFilter(true)).to.equal('Yes');
});
```

###### Test it will display No for false

```javascript
it('should display "No" for boolean false', function() {
  expect(yesNoFilter(false)).to.equal('No');
});
```

###### Test it will display N/A for undefined

```javascript
it('should display "N/A" for undefined', function() {
  expect(yesNoFilter(undefined)).to.equal('N/A');
});
```

###### Test it will display N/A for null

```javascript
it('should display "N/A" for null', function() {
  expect(yesNoFilter(null)).to.equal('N/A');
});
```
&nbsp;
### Inject the module
- In order for the filter to be available, we need to inject the module into the controller that will be using it.
- Open **client/src/app/employees/controllers.js**
- Find the `TODO` at the top of the page and register it as a dependency.

```javascript
'boolean.filters'
```

&nbsp;
### Add our new filter to the employee pages

- Open **client/assets/templates/app/employees/form.html**
- Find the field that is bound to the admin property and change the binding to:

```xml
{{employeeFormCtrl.employee.admin | yesNo}}
```
- Now open **client/assets/templates/app/employees/index.html**
- Find the `<td>` with the admin binding and change it to:

```xml
<td>{{employee.admin | yesNo}}</td>
```
- Now refresh the application page and navigate to the employee pages.
- Are the fields now displaying 'Yes' and 'No'?

&nbsp;
## Wrapping a vendor library for a custom filter

### The situation
- For this lab, you will wrap the awesome **Moment.js** library to display dates.
- Our management has decided that they do not like the format of the Angular-provided `date` filter.
- We intend to create our own custom filter that will use Moment to automatically format the dates for us.

### Create the filter's module

- Open **client/src/filters/date.js**
- At the top of the page register the `date.filters` module:

```javascript
angular.module('date.filters', [
  'date.utils.services'
])
```
- You'll notice that your teammates have already created a utility to handle dates being null or undefined.
  - Open up the date utils service in the `services` directory and familiarize yourself with what it does.
  - We'll use it in our filters, so we needed to add the module as a dependency.

&nbsp;
### Create a filter to format a date like *Nov 18, 2013*

- Right below our module declaration, register the `momentShortDate` filter:

```javascript
  .filter('momentShortDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMM D, YYYY");
    };
  });
```
- Notice that it uses the date utility service to return early if the string passed in is `null` or `undefined`.
- Without this, **Moment** would throw an error when `null` or `undefined` was passed in to the `format` function.

### Test the new filter

- Let's write unit tests for our new filter to make sure it behaves as expected.
- Open **client/test/unit/filters/date.spec.js**

- Just like we did with the yesNo filter tests, inject the `date.filters` module in the top-level `beforeEach`.

- Next, we need to inject our filter into our test.
- Find the `TODO` to inject the `momentShortDateFilter` and replace it with:

```javascript
momentShortDateFilter = $injector.get('momentShortDateFilter');
```

- Now we can write our tests:

###### Test for proper display

```javascript
it('should display "Nov 15, 2010" for 2010-11-15', function() {
  expect(momentShortDateFilter("2010-11-15")).to.equal('Nov 15, 2010');
});

it('should display "Jan 30, 2013" for 2013-01-30', function() {
  expect(momentShortDateFilter("2013-01-30")).to.equal('Jan 30, 2013');
});
```

###### Test for a null date

```javascript
it('should display "None" for a null date', function() {
  expect(momentShortDateFilter(null)).to.equal('None');
});
```

###### Test for an undefined date

```javascript
it('should display "None" for a undefined date', function() {
  expect(momentShortDateFilter(undefined)).to.equal('None');
});
```

###### Test for an invalid date

```javascript
it('should display "Invalid date" for an invalid date', function() {
  expect(momentShortDateFilter("not a date")).to.equal('Invalid date');
});
```
- Enter and run the above tests using the Karma runner.
- Did they all pass?

### Add the short date filter to the application pages

###### Add dependency
- Before we can use our new filter, we need to add its module as a dependency.
- Since this is an app-wide dependency, we can add it to our `main.js`.
- Open **client/src/main.js**.
- Add the date filter module as a dependency:
```
'date.filters'
```

###### Add the filter to the fields.
- Now that we have the module being instantiated at startup, we can use the filters in our DOM.
- Open **client/assets/templates/app/timesheets/detail.html**
- Find the table cell that is bound to the `timeunit.dateWorked`.

```xml
<td>{{timeunit.dateWorked | momentShortDate}}</td>
```

- Open **client/assets/templates/app/timesheets/index.html**
- Change the below bindings to use the new `momentShortDate` filter:

```xml
<td>{{timesheet.beginDate | momentShortDate}}</td>
<td>{{timesheet.endDate | momentShortDate}}</td>
```

- Navigate to both pages and verify that your new filter is working.

- Nice job, but management still is unsatisfied...

&nbsp;
### Create a filter to format a long date like *November 18, 2013*
- Management also wants some dates to have a long format
- In `date.js`, register the `momentLongDate` filter under the `momentShortDate` filter.
  - Don't forget to remove the `;` after the `momentShortDate` filter.

```javascript
  .filter('momentLongDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMMM Do, YYYY");
    };
  });
```

### Test the long date filter

- Now we need to write our unit tests for our new filter to verify it behaves correctly.
- Open the date filter specs.
- Inject the filter and assign it to the test filter in the `beforeEach` block:

```javascript
momentLongDateFilter = $injector.get('momentLongDateFilter');
```

###### Test the filter formats as expected

```javascript
it('should display "November 15th, 2010" for 2010-11-15', function() {
  expect(momentLongDateFilter("2010-11-15")).to.equal('November 15th, 2010');
});

it('should display "January 30th, 2013" for 2013-01-30', function() {
  expect(momentLongDateFilter("2013-01-30")).to.equal('January 30th, 2013');
});
```

###### Test for null dates

```javascript
it('should display "None" for a null date', function() {
  expect(momentLongDateFilter(null)).to.equal('None');
});
```

###### Test for undefined dates

```javascript
it('should display "None" for a undefined date', function() {
  expect(momentLongDateFilter(undefined)).to.equal('None');
});
```

###### Test for invalid dates

```javascript
it('should display "Invalid date" for an invalid date', function() {
  expect(momentLongDateFilter("not a date")).to.equal('Invalid date');
});
```

- Run each test after adding it to the specification.
- Did they all pass?

### Use the filter in our views

- Now let's add the filter to the timesheet list page
- Open **client/assets/templates/app/timesheets/detail.html**
- Find the bindings for the begin and end dates and replace them with:

```javascript
{{timesheetDetailCtrl.timesheet.beginDate | momentLongDate}}
{{timesheetDetailCtrl.timesheet.endDate | momentLongDate}}
```

- Make sure your server is running and navigate to the timesheet page.
- How do your new filters look?

### Commit your code to git.
```
git add .
git commit -m 'Heard ya like filters so we put some filters in your filters so you can filter while filtering.'
```
