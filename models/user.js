'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var ObjectId = mongoose.Schema.Types.ObjectId;

const JWT_SECRET = process.env.JWT_SECRET;

console.log('SECRET\n', JWT_SECRET);


var userSchema = new mongoose.Schema({
  name            :   { first: String, last: String},
  username        :   { type: String, required: true, unique: true},
  password        :   { type: String, required: true},
  image           :   { type: String, required: false},
  about           :   { type: String},
  posts           :   [{ date: Date, post: String}]
});

userSchema.statics.isLoggedIn = function(req, res, next){
  console.log('req.cookies=\n',req.cookies);
  var token = req.cookies.accessToken;

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).send({ error: 'You are not authorized!'});
    console.log('payload', payload);
    User
    .findById(payload._id)
    .select({ password: false })
    .exec((err, user) => {
      if(err || !user){
        return res
        .clearCookie('accessToken')
        .status(400)
        .send(err || {error: 'User not found.'});
      }

      req.user = user;
      next();
    });
  });
};

userSchema.statics.register = function( userObj, cb ) {
  // create new user
  console.log(userObj);
  this.create(userObj, cb);
};

userSchema.statics.login = function( userObj, cb ){
  this.findOne({username: userObj.username}, (err, dbUser) => {
    if(err || !dbUser) return cb(err || {error: 'Login failed. Username or Password Incorrect!'});

    if( dbUser.password != userObj.password ){
      return cb(err || {error: 'Login failed. Username or Password is Incorrect'});
    }

    var token = dbUser.createToken(userObj);
    dbUser.password = null;
    cb(null, {token:token, dbUser:dbUser});
  });
}

userSchema.methods.createToken = function(){
  var token = jwt.sign({ _id: this._id }, JWT_SECRET);
  console.log('token\n', token);
  return token;
}

var User = mongoose.model('User', userSchema);
console.log('@user.js => ', JSON.stringify(User, 2, null));
module.exports = User;







// var Property = require('./property');
// console.log('User @ user.js => ', JSON.stringify(User, 2, null));

// email       :   { type: String},
// signup      :   { type: String},
// status      :   { type: String, enum: ['active', 'inactive', 'rejected', 'seeking']},
// tenure      :   { type: Number},
// personalAddress   :   {region: String, country: String, street: String, city: String, state: String, zip: Number},
// locationAddress   :   {region: String, country: String, street: String, city: String, state: String, zip: Number},
// property         : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property'}]

// clientSchema.statics.moveIn = function(clientId, propertyId, cb) {
//   if(clientId === propertyId){
//     return cb({error: "Duplicate ID's"})
//   }
//   Client.findById(clientId, (errClient, client) => {
//     Property.findById(propertyId, (errProperty, property) => {
//       console.log("property FOUND=\n", property);
//       if(errClient || errProperty) return cb( errClient || errProperty );
//
//       var clientHasProperty = client.property.indexOf(property._id) != -1;
//       var PropertyHasClient = property.client.indexOf(client._id) != -1;
//
//       if(clientHasProperty || PropertyHasClient) {
//         return cb({ error: "Client Already Owns this TimeShare!" });
//       }
//       console.log('client=\n',client);
//       client.property.push(property._id);
//       console.log('client=\n',client);
//       console.log('//////////////////////////');
//       console.log('property=\n',property);
//       property.client.push(client._id);
//       console.log('property=\n',property);
//
//       client.save((errProperty) => {
//         property.save((errClient) => {
//           cb(errProperty || errClient);
//         });
//       });
//     });
//   });
// };
