'use strict';

var app = angular.module('authentiSpace');

app.service('User', function($http, $q){

  // for Login page
  this.getUsers = () => {
    console.log("get users");
    return $http.get('/api/users')
  };

  // for LOGIN button TO profile page (in resolve callback)
  this.login = loginObj => {
    console.log("Login Info:\n", loginObj);
    return $http.post(`api/users/login`, loginObj);
  };

  // for REGISTER page
  this.create = newUser => {
    console.log("Service new user\n", newUser);
    return $http.post('/api/users/sign-up', newUser);
  };

  this.logout = () => {
    return $http.delete(`/api/users/logout`);
  }
  // for PROFILE page
  this.getProfile = () => {
    return $http.get('/api/users/profile')
    .then(res => {
      this.currentUser = res.data;
      return $q.resolve(res.data);
    })
    .catch(res => {
      this.currentUser = null;
      return $q.reject(res.data);
    })
  }

  // this.recordPost = newPost => {
  //   return $http.post('/api/users/profile/', newPost)
  //   .then(res => {
  //     this.currentUser.posts.push(res.data);
  //   })
  // }

  // for Delete account page
  // this.deleteUser = id => {
  //   console.log("Delete this:\n", id);
  //   return $http.delete(`/api/users/${id}`);
  // };
  //
  // // for Edit ~ everything else
  //   this.editUser = editedUser => {
  //     console.log("Edit this:\n",editedUser);
  //     return $http.put(`/api/users/${editedUser._id}`, editedCard);
  //   }
});
