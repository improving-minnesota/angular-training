### timesheet/client/assets/templates/app/employees/form.html

```JavaScript
{{employee.admin | yesNo}}
```

### timesheet/client/assets/templates/app/employees/index.html

```JavaScript
ng-repeat="employee in pageConfig.data | orderBy:'username'"
```

* line 34

```JavaScript
<td>{{employee.admin | yesNo}}</td>
```

### timesheet/client/assets/templates/app/projects/index.html

```JavaScript
ng-repeat="project in pageConfig.data | orderBy:'name'"
```

### timesheet/client/assets/templates/app/timesheets/detail.html

```JavaScript
{{timesheet.beginDate | momentLongDate}}
{{timesheet.endDate | momentLongDate}}
```

```html
ng-repeat="timeunit in timeunits | orderBy:'dateWorked'"
```

```html
<td>{{timeunit.dateWorked | momentShortDate}}</td>
```

### timesheet/client/assets/templates/app/timesheets/index.html

```html
ng-repeat="timesheet in pageConfig.data | orderBy:beginDate"
```

* line 29

```html
<td>{{timesheet.beginDate | date}}</td>
<td>{{timesheet.endDate | date}}</td>
```

### timesheet/client/src/app/employees/controllers.js

inject boolean filters

### timesheet/client/src/filters/boolean.js

```JavaScript
angular.module('boolean.filters', [ ])

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

### timesheet/client/src/filters/date.js

```JavaScript
angular.module('date.filters', [
  'date.utils.services'
])

  // Nov 18, 2013
  .filter('momentShortDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMM D, YYYY");
    };
  })

  // November 18th, 2013
  .filter('momentLongDate', function (dateUtils) {
    return function (dateString) {
      return dateUtils.nullOrUndefined(dateString) || moment(dateString).format("MMMM Do, YYYY");
    };
  });
```

### timesheet/client/src/main.js

inject date.filters

### timesheet/client/test/unit/filters/boolean.spec.js

* line 4

```JavaScript
beforeEach(module('boolean.filters'));
```

* line 10

```JavaScript
yesNoFilter = $injector.get('yesNoFilter');
```

* line 13

```JavaScript
it('should display "Yes" for boolean true', function() {
  expect(yesNoFilter(true)).to.equal('Yes');
});

it('should display "No" for boolean false', function() {
  expect(yesNoFilter(false)).to.equal('No');
});

it('should display "N/A" for undefined', function() {
  expect(yesNoFilter(undefined)).to.equal('N/A');
});

it('should display "N/A" for null', function() {
  expect(yesNoFilter(null)).to.equal('N/A');
});
```

### timesheet/client/test/unit/filters/date.spec.js

* momentShortDate

```JavaScript
momentShortDateFilter = $injector.get('momentShortDateFilter');
```

```JavaScript
it('should display "Nov 15, 2010" for 2010-11-15', function() {
  expect(momentShortDateFilter("2010-11-15")).to.equal('Nov 15, 2010');
});

it('should display "Jan 30, 2013" for 2013-01-30', function() {
  expect(momentShortDateFilter("2013-01-30")).to.equal('Jan 30, 2013');
});

it('should display "None" for a null date', function() {
  expect(momentShortDateFilter(null)).to.equal('None');
});

it('should display "None" for a undefined date', function() {
  expect(momentShortDateFilter(undefined)).to.equal('None');
});

it('should display "Invalid date" for an invalid date', function() {
  expect(momentShortDateFilter("not a date")).to.equal('Invalid date');
});
```

* momentLongDateFilter tests

```JavaScript
momentLongDateFilter = $injector.get('momentLongDateFilter');
```

```JavaScript
it('should display "November 15th, 2010" for 2010-11-15', function() {
  expect(momentLongDateFilter("2010-11-15")).to.equal('November 15th, 2010');
});

it('should display "January 30th, 2013" for 2013-01-30', function() {
  expect(momentLongDateFilter("2013-01-30")).to.equal('January 30th, 2013');
});

it('should display "None" for a null date', function() {
  expect(momentLongDateFilter(null)).to.equal('None');
});

it('should display "None" for a undefined date', function() {
  expect(momentLongDateFilter(undefined)).to.equal('None');
});

it('should display "Invalid date" for an invalid date', function() {
  expect(momentLongDateFilter("not a date")).to.equal('Invalid date');
});
```


hello
