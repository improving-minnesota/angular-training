var _ = require('lodash');

// schema definition
var user = {
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  admin: false,
  enabled: true,

  validPassword : function (password) {
    return user.password === password;
  },

  sanitize : function () {
    return _.omit(user.toJSON(),'password');
  }

};

module.exports = user;