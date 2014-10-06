Angular Training Labs and Slides Project
================
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/objectpartners/angular-training?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Labs ##
Lab markdown files are located in the labs folder

## Slide Deck ##
The slide deck is located in the slidedeck folder.  You can access the 
slides using GitHub pages [here](http://objectpartners.github.io/angular-training)

### Dependencies ###

* [Node](http://nodejs.org/)
* [Grunt](https://github.com/cowboy/grunt) `npm install -g grunt-cli` 
* [Bower](http://twitter.github.com/bower/) `npm install -g bower`

####Getting Started
* Run `npm install` to install node dependencies
* Run `bower install` to install client-side dependencies

####Grunt Commands
`grunt assemble`
  * Minify/uglify the javascript source and css
  * Compiles jade
  * Stages everything in the dist folder
  
`grunt run`
  * Starts a server running on port 8001
  * Watches for changes on project files
  * When files change, the assemble task is re-run and
  * Livereload triggers browser update on assemble task completion
  
`grunt publish`
  * Publishes slides to GitHub pages
  * Uses git subtree merge to merge the contents of dist into the gh-pages branch
