'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

console.log('@users.js => ', JSON.stringify(User, 2, null));

/////// - AUTHENTICATION
router.route('/')
.get((req, res) => {
  User
  .find({}, (err, users) => {
    res.status(err ? 400: 200).send(err || users);
  });
});

router.route('/sign-up')
.post((req, res) => {
  console.log('req.body=> \n', req.body);
  User
  .register(req.body, err => {
    console.log(err);
    res.cookie('COOKIE', `${req.body.username}`);
    res.status(err ? 400: 200).send(err || 'registered!');
  });
});

router.post('/login', (req, res) => {
  console.log('backend Info', req.body);
  User.login(req.body, (err, data) => {
      if(err) return res.status(400).send(err);
      res.cookie('accessToken', data.token).send(data.dbUser);
    });
});

router.delete('/logout', (req, res) => {
  res.clearCookie('accessToken').send();
});

router.get('/profile', User.isLoggedIn, (req, res) => {
  console.log('req.user->\n', req.user);
  res.send(req.user);
});


/////// - CRUD

// router.route('profile/:id')
// .get((req, res) => {
//   User
//   .findById(req.params.id)
//   .populate('property')
//   .exec(res.handle)
// })

module.exports = router;


// .delete((req, res) => {
//   User
//   .findByIdAndRemove(req.params.id)
//   .exec(res.handle)
// })
// .put((req, res) => {
//   User
//   .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true})
//   .exec(res.handle)
// });
//
// router.put('/:client/buy/:property', (req, res) => {
//   User.moveIn(req.params.client, req.params.property, res.handle);
// });
//
// router.put('/:client/sell/:property', (req, res) => {
//   User.moveOut(req.params.client, req.params.property, res.handle);
// });


// router.get('/:id', (req, res) => {
//   Client.findById(req.params.id, (err, client) =>{
//     if(err){
//       res.status(400).send(err);
//     } else {
//       res.send(client);
//     }
//   });
// });

// router.delete('/:id', (req, res) => {
//   Client.findByIdAndRemove(req.params.id, err => {
//     if(err){
//       res.status(400).send(err);
//     } else {
//       res.send("Deleted!");
//     }
//   });
// });
//
// router.put('/:id', (req, res) => {
//   console.log('reqBody =>\n', req.body);
//   Client.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, client) => {
//     if(err){
//       res.status(400).send(err);
//     } else {
//       res.send(client);
//     }
//   });
// });


// router.post('/', (req, res) => {
//   console.log('sendThisClient\n',req.body);
//   Client.create(req.body, (err, savedClient)=>{
//     if(err){
//       res.status(404).send(err);
//     } else {
//       console.log("Saved the Client!");
//       res.send(savedClient);
//     }
//   });
// });

// router.get('/:category', (req, res) => {
//   console.log(req.params.category);
//   Client.find(req.params.category, (err, client) =>{
//     if(err){
//       res.status(400).send(err);
//     } else {
//       res.send(client);
//     }
//   });
// });
