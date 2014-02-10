module.exports = (function () {
  var DataStore = require('nedb'),
    Q = require('q');

  var db;
  var initDb = function initDb() {
    db = {};
    
    db.users = new DataStore({filename: 'data/users.db', autoload: true});
    db.users.ensureIndex({fieldName: 'username', unique: true});
    db.users.ensureIndex({fieldName: 'email', unique: true});

    db.timesheets = new DataStore({filename: 'data/timesheets.db', autoload: true});
    db.timeunits = new DataStore({filename: 'data/timeunits.db', autoload: true});

    db.projects = new DataStore({filename: 'data/projects.db', autoload: true});
    db.projects.ensureIndex({fieldName: 'name', unique: true});

    db.find = function (model, query) {
      return Q.ninvoke(db[model], 'find', query);
    };

    db.insert = function (model, body) {
      return Q.ninvoke(db[model], 'insert', body);
    };

    db.findOne = function (model, query) {
      return Q.ninvoke(db[model], 'findOne', query);
    };

    db.update = function (model, query, body, options) {
      options = options || {};
      var deferred = Q.defer();

      db[model].update(query, body, options, function (err, numChanged, upsert) {
        if (numChanged > 0) {
          deferred.resolve();
        }
        else {
          deferred.reject(err);
        }
      });

      return deferred.promise;
    };

    db.remove = function (model, query) {
      return Q.ninvoke(db[model], 'remove', query);
    };
    
    return db;
  };

  return db || initDb();

}());