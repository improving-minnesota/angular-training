module.exports = (function () {

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')
    ;

  // schema definition
  var userSchema = new Schema ({
    username: {type: String, unique: true},
    password: {type: String, index: true},
    firstName: String,
    lastName: String,
    admin: Boolean,
    enabled: Boolean,
    accountExpired: Boolean,
    accountLocked: Boolean,
    passwordExpired: Boolean,
    socketId: String,
    roomIds: [String]
  });

  // Static functions
  userSchema.statics.findByUsername = function (username, cb) {
    this.findOne({username: username}, cb);
  };

  // Instance methods
  userSchema.methods.validPassword = function (password) {
    // This is just a basic clear text comparision for prototype purposes.
    // In a real system, we will want to encrypt.
    return this.password === password;
  };

  userSchema.methods.withoutPassword = function () {
    return _(this.toJSON()).omit('password');
  };

  return mongoose.model('User', userSchema);

}());