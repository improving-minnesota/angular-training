var fs = require('fs'),
  Q = require('q'),
  locomotive = require('locomotive');

locomotive.boot('./', process.env.NODE_ENV, function (err, app) {
  if (err){
    throw err;
  }
  
  console.log('process env : ' + process.env.NODE_ENV);
  console.log('app.settings.port: ' + app.settings.port);
  console.log('app.settings.securePort: ' + app.settings.securePort);
  console.log('app.settings.env: ' + app.settings.env);

  var keys = Object.keys(app.settings);
  console.log('keys : ' + keys);
  for (var a = 0; a < keys.length; a++) {
    var key = keys[a];
    console.log(key + ": " + app.settings[key]);
  }

  // Start the HTTP server
  Q.fcall(function() {
    var deferred = Q.defer();
    var server = app.listen(app.settings.port, function () {
      console.log("Ready for requests on port %d in %s mode.", app.settings.port, app.settings.env);
      deferred.resolve();
    });
    return deferred.promise;
  })
  // Then send the ready
  .then(function() {
    console.log('Server is ready and serving on HTTP.');
    console.log('Returning ready to the parent process if any.');
    if (process.send) {
      process.send({ status: 'ready' });
    }
  });
});
