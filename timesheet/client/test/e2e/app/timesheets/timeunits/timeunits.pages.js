function TimeunitsFormPage() {
  
  this.getDetail = function (userId, timesheetId, timeunitId) {
    browser().get('#/app/users/' + 
      userId + 
      '/timesheets/detail/' + 
      timesheetId + 
      '/timunits/detail' + 
      timeunitId);
  };

  this.getCreate = function (userId, timesheetId) {
    browser().get('#/app/users/' + 
      userId + 
      '/timesheets/detail/' + 
      timesheetId + 
      '/timunits/create');
  };

  this.getSaveButton = element(by.buttonText('Save'));
  this.cancelButton = element(by.buttonText('Cancel'));
}