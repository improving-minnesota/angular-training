function EmployeesIndexPage() {

  this.get = function () {
    browser().get('#/app/employees');
  };

  this.newEmployeeButton = element(by.buttonText("New Employee"));

  this.employeeTable = element(by.css('table'));
  this.employeeRows = element(by.repeater('employee in pageConfig.data'));
  this.firstEmployee = this.employeeRows.row(0);
}

function EmployeesFormPage() {
  
  this.getDetail = function (employeeId) {
    browser().get('#/app/employees/detail/' + employeeId);
  };

  this.getCreate = function () {
    browser().get('#/app/employees/create');
  };

  this.getSaveButton = function (buttonText) {
    return element(by.buttonText(buttonText));
  };

  this.cancelButton = element(by.buttonText('Cancel'));
}