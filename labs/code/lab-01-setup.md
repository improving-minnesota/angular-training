# Lab one - Setup and install dependencies

### Checkout the Github repository

* Checkout project from Github
```
git clone https://github.com/objectpartners/angular-training.git
```
* You should get output similar to below:
```
Cloning into 'angular-training'...
remote: Counting objects: 3003, done.
remote: Compressing objects: 100% (1458/1458), done.
remote: Total 3003 (delta 1413), reused 2684 (delta 1256)
Receiving objects: 100% (3003/3003), 1.44 MiB | 1.15 MiB/s, done.
Resolving deltas: 100% (1413/1413), done.
Checking connectivity... done.
```

* Now let's checkout the `lab-1-setup` branch.
```
git checkout lab-1-setup
```

* Change directories to the lab main directory.
```
cd angular-training/timesheet
```

### Install the application dependencies

* Install the NPM dependencies
```
npm install
```

* Install the Bower dependencies
```
bower install
```

### Run the application and view the start screen

* In a console window, run:
```
grunt runapp:development
```

* This kicks of a Node server and serves up our `index.html` page.

* Open your browser and navigate to [http://localhost:3000] the application home page.

* Verify that you see the welcome page.

* Now let's check out our project's structure so we know what goes where. 
