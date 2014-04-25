UP AngularJS Training

Lab Bootstrap

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
cd /c/Users/<username>/Desktop/angular-training

# Start the watch:development task
grunt watch:development

# Open Chrome and navigate to http://localhost:3000

```

If Chrome is not installed 
- Open windows explorer 
- Navigate to c:\Program Files\Google\Chrome\Application\<latest version>\installer
- Run setup.exe