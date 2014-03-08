function TimesheetsIndexPage() {
  this.get = function (userId) {
    browser().get('#/users/' + userId + '/timesheets');
  };

  this.newTimesheetButton = element(by.buttonText('New Timesheet'));

  
}

function TimesheetsFormPage() {
  this.getEdit = function (userId, timesheetId) {
    browser().get('#/users/' + 
      userId + 
      '/timesheets/detail/' + 
      timesheetId + 
      '/edit');
  };

  this.getCreate = function (userId) {
    browser().get('#/users/' + userId + 'timesheets/create');
  };

  this.getSaveButton = function (buttonText) {
    return element(by.buttonText(buttonText));
  };

  this.cancelButton = element(by.buttonText("Cancel"));
}

function TimesheetsDetailPage() {
  this.get = function (userId, timesheetId) {
    browser().get('#/users/' + userId + '/timesheets/detail/' + timesheetId);
  };
}