module.exports = function(grunt) {

  grunt.registerMultiTask('runapp', 'Run the node server in a daemon with an environment', function () {

    var _ = require('underscore'),
      spawn = require('child_process').spawn,
      fork = require('child_process').fork;

    var options = _.defaults(this.data.options || {}, {
      dieWithParent: false
    });

    // keep alive (ctrl-c to stop)
    var done = this.async();

    //We're going to die at the end of the current process (grunt task)
    if (options.dieWithParent) {
      global.runappciChild = fork('api/server.js', {
        env: _.extend(process.env, {NODE_ENV: this.data.env})
      });

      // A helper function to shut down the child.
      global.runappciChild.shutdown = function () {
        // Get rid of the exit listener since this is a planned exit.
        grunt.log.error('Terminating the server.');
        this.kill("SIGTERM");
      };

      // SIGTERM AND SIGINT will trigger the exit event.
      process.once("SIGTERM", function () {
        process.exit(0);
      });

      process.once("SIGINT", function () {
        process.exit(0);
      });

      // And the exit event shuts down the child.
      process.once("exit", function () {
        global.runappciChild.shutdown();
      });

      //Preserve the exception when something goes wrong
      process.once("uncaughtException", function (error) {
        // If this was the last of the listeners, then shut down the child and rethrow.
        if (process.listeners("uncaughtException").length === 0) {
          global.runappciChild.shutdown();
          throw error;
        }
      });

      //Wait for the server to tell us that it's ready to serve requests.
      global.runappciChild.on('message', function(data) {
        if (data.status === 'ready') {
          grunt.log.ok('Server ready.');
          done();
        }
      });

    //We're going to keep the grunt task from finishing until a SIGTERM or SIGINT is received
    } else {
      grunt.log.writeln('Spawning the nodemon process');

      var nodemon = spawn('nodemon', ['api/server.js'], {
        env: _.extend(process.env, {NODE_ENV: this.data.env})
      });

      //STDOUT Pipe
      nodemon.stdout.on('data', function (data) {
        console.log('%s', data);
      });

      //STDERR Pipe
      nodemon.stderr.on('data', function (data) {
        console.log('%s', data);
      });

      nodemon.on('close', function (code) {
        console.log('The nodemon process exited with code ' + code);
        done();
      });

      process.once("SIGTERM", function () {
        grunt.log.writeln('');
        grunt.log.error('The Grunt runapp task caught SIGTERM.  Shutting down.');
        grunt.log.writeln('');
      });

      process.once("SIGINT", function () {
        grunt.log.writeln('');
        grunt.log.error('The Grunt runapp task caught SIGINT. Shutting down.');
        grunt.log.writeln('');
      });
    } 
  });

};
