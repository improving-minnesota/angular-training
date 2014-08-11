# UP AngularJS Training

## Lab Bootstrap at Union Pacific

```bash
# Change directories to your desktop
cd /c/Users/<username>/Desktop

# Checkout the project source from github
git clone https://github.com/objectpartners/angular-timesheet

# Move in to the project folder
cd angular-timesheet

# Checkout the Lab 1 branch
git checkout lab-1-setup

# Install Bower and Grunt globally with NPM
npm install -g bower
npm install -g grunt-cli

# Install Node.js Dependencies
npm install

#Export global npm modules path
export PATH="${PATH}:/c/Users/<username>/AppData/Roaming/npm"

# Install Bower Dependencies
# (type n to disable collection of statistics)
bower install 

# Start the backend server
export NODE_ENV="development"; node api/server.js

# Open a second terminal to the project folder
cd /c/Users/<username>/Desktop/angular-timesheet

# Start the watch:development task
grunt watch:development

# Open Chrome and navigate to http://localhost:3000

# Open notepad and save the following lines.
# You will need to run these everytime you open a new terminal window.
cd /c/Users/<username>/Desktop/angular-timesheet
export PATH="${PATH}:/c/Users/<username>/AppData/Roaming/npm"


```

## If Chrome is not installed 
- Open windows explorer 
- Navigate to c:\Program Files\Google\Chrome\Application\<latest version>\installer
- Run setup.exe


## Installing Chrome Driver Manually

Since the firewall blocks downloading executables or zips, you'll have to manually copy the chromedriver executable from the share drive.

```bash

# Move in to the project folder
cd angular-timesheet

# Make a selenium folder inside the protractor node_module folder
mkdir ./node_modules/protractor/selenium

# Copy the Windows 7 Chrome Driver from the network drive to the selenium folder
cp /g/All/Training/Angular/chromedriver.exe node_modules/protractor/selenium/.

```
