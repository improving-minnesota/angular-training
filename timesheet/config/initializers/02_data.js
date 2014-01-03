var _ = require('underscore')
  , mongoose = require('mongoose')
  , User = require('../../app/models/user')
  ; 

function logResult(err, result) {
  if  (err) {
    console.log('Error saving ' + result.model + " : " + err);
  }
  else {
    console.log('Created : ' + result.model);
  }
}

// The saveAll function will iterate through an array of json objects and 
// save them as the passed in Schema. This helps us create a nested tree 
// of objects. 
// 
// schema : The actual Mongoose schema object to be saved.
// nested : The string name of the nested property.
// docs: The array of json objects.
// callback : Will be called with an error and/or the array of saved sub-items.
function saveAll( schema, nested, docs, callback ){
  var count = 0;
  var savedItems = [];

  docs.forEach(function(doc){
      saveDoc(schema, nested, doc, function(err, item) {
          savedItems.push(item);

          count++;
          if( count == docs.length ){
             callback(err, savedItems);
          }
      });
  });
}

// saveDoc saves an individual do to a Mongoose schema object. 
//
// schema : The actual Mongoose schema object to be saved.
// nested : The string name of the nested property.
// doc: The json object to be saved.
// callback : Will be called with an error and/or the saved item.
function saveDoc(schema, nested, doc, callback) {
  if (!!doc[nested] && !_.isUndefined(nested)) {
    saveAll(schema, nested, doc[nested], function (err, subItems) {

      doc[nested] = _.map(subItems, function (item) {
        return item._id;
      });

      new schema(doc).save(function (err, sn) {
        logResult(err, {model: doc.state});
        callback(err, sn);
      });
    });
  }
  else {
    new schema(doc).save(function (err, sn) {
      logResult(err, {model: doc.state});
      callback(err, sn);
    });
  }
}

////////////  USERS //////////////////
function newUsers() {
  console.log('Seeding Users into DB');
  var users = require('../../data/users').users;

  _(users).each(function (user) {
    new User(user).save(function (err) {
      logResult(err, {model: user.username});
    });
  });
}

// User.remove().exec().then(function (){
//   newUsers();
// });

newUsers();
