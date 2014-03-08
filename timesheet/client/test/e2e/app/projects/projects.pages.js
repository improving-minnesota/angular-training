function ProjectsIndexPage() {

  this.get = function () {
    browser().get('#/app/projects');
  };

  this.newProjectButton = element(by.buttonText("New Project"));

  this.projectTable = element(by.css('table'));
  this.projectRows = element(by.repeater('project in pageConfig.data'));
  this.firstProject = this.employeeRows.row(0);
}

function ProjectsFormPage() {
  
  this.getDetail = function (projectId) {
    browser().get('#/app/projects/detail' + projectId);
  };

  this.getCreate = function () {
    brower().get('#/app/projects/create');
  };

  this.getSaveButton = function (buttonText) {
    return element(by.buttonText(buttonText));
  };

  this.cancelButton = element(by.buttonText('Cancel'));
}