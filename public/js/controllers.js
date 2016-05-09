'use strict';

var app = angular.module('authentiSpace');

app.controller('homeCtrl', function($scope, $state){
  console.log('homeCtrl');
});

app.controller('profileCtrl', function($scope, $state, $stateParams, User){
  console.log('profileCtrl');

  $scope.$watch(function() {
    return User.currentUser;
  }, function(newVal, oldVal) {
    $scope.currentUser = newVal;
  });

  $scope.newPost = postBody => {
    var date = new Date();
    var dateString = date.toString();
    var date = dateString.split('').slice(0,15).join('');
    $scope.date = date;
    $scope.post = postBody;
  }

  var hasLiked = false;
  $scope.toggleLike = function () {
    if (!hasLiked) {
      hasLiked = true;
      $scope.liked = 'Unlike';
      $scope.likeCount += 1;
    } else {
      hasLiked = false;
      $scope.liked = 'Like';
      $scope.likeCount -= 1;
    }
  };

    //
    //
    // $scope.posts = [];
    //
    // $scope.firstName = $stateParams.userInfo.name.first;
    // $scope.username = $stateParams.userInfo.username;
    // $scope.image = $stateParams.userInfo.img;
    // $scope.aboutMe = $stateParams.userInfo.about;
    // $scope.posts = $stateParams.userInfo.posts;
    //
    // User.getUsers()
    // .then(res => {
    //   res.data.forEach( users => {
    //     $scope.posts = users.posts;
    //   });
    // });
    //
    //
    //
    //

    $scope.logout = () => {
      User.logout()
      .then(res => {
        $state.go('home');
      })
    }

  });

  app.controller('loginCtrl', function($scope, $state, User){
    console.log('loginCtrl');
    $scope.loginPage = true;
    $scope.loginError = true;

    // var foundUser = {};
    // var users = [];

    // User.getUsers()
    // .then(dbUsers => {
    //   console.log(dbUsers.data);
    //   users = dbUsers.data;
    // });
    $scope.signUpClicked = () => {
      $scope.loginPage = false;
      $state.go('signUp');
    };

    $scope.verifyUser = (loginUsername, loginPassword) => {
      var userObj = {
        username : loginUsername,
        password : loginPassword
      }
      User.login(userObj)
      .then(dbUser => {
        console.log(dbUser.data);
        if(dbUser){
          $scope.loginPage = false;
          $state.go('profile', {user: `${dbUser.data.username}`, userInfo: dbUser.data});
        };
      });
    };
  });

  app.controller('signUpCtrl', function($scope, $state, User){
    console.log('signUpCtrl');

    $scope.createUser = () => {

      var name = {
        first   :   $scope.name.first,
        last    :   $scope.name.last
      };

      var newUser = {
        name      : name,
        username  : $scope.username,
        password  : $scope.password,
        image     : $scope.image,
        about     : $scope.about
      };

      User.create(newUser)
      .then(cb => {
        console.log(cb);
        newUser = {};
        $state.go('login');
      });
    };
  });




  // app.controller('propertiesCtrl', function($scope, $state, Property){
  //   console.log('propertiesCtrl');
  //
  //   Property.getProperties()
  //   .then(dbProperties => {
  //     console.log(dbProperties);
  //     $scope.properties = dbProperties.data;
  //   });
  //
  //   $scope.deleteProperty = id => {
  //     Property.delete(id);
  //     Property.getProperties()
  //     .then(newProperties => {
  //       $scope.properties = newProperties.data;
  //     });
  //   };
  //
  //   $scope.sortBy = order => {
  //     if($scope.sortOrder === order){
  //       $scope.sortOrder = -order;
  //     } else {
  //       $scope.sortOrder = order;
  //     };
  //   };
  //   //$scope.<ARRAY> = [];
  // });
  //
  // $scope.verifyUser = (username, password) => {
  //   users.filter(user => {
  //     return user.password === password && user.username === username;
  //   });
  //
  //   if(foundUser === {}){
  //     console.log('founduser= ',foundUser);
  //     return $scope.loginError = false;
  //   }
  // };

  // $scope.deleteUser = id => {
  //   User.delete(id);
  //   User.getUsers()
  //   .then(dbUsersNew => {
  //     users = dbUsersNew.data;
  //   });
  // };

  // $scope.sortBy = order => {
  //   if($scope.sortOrder === order){
  //     $scope.sortOrder = -order;
  //   } else {
  //     $scope.sortOrder = order;
  //   };
  // };
  //$scope.<ARRAY> = [];


  // app.controller('databaseCtrl', function($scope, $state, Client, Property){
  //
  //   Client.getClients()
  //   .then(dbClients => {
  //     $scope.clients = dbClients.data;
  //   });
  //
  //   Property.getProperties()
  //   .then(dbProperties => {
  //     $scope.properties = dbProperties.data;
  //
  //   });
  //
  //
  // });

  //  CRUD controllers
  // app.controller('addCtrl', function($scope, Property, Client, $state){
  //
  //   $scope.createProperty = () => {
  //     var newProperty = {
  //       address         :   {
  //         region    : $scope.newRegion.selected,
  //         country   : $scope.newCountry,
  //         city      : $scope.newCity,
  //         state     : $scope.newState,
  //         street    : $scope.newStreet,
  //         zip       : $scope.newZip
  //       },
  //       listPrice       :   $scope.listPrice,
  //       customerRating  :   $scope.newRating.selected,
  //       marketPrice     :   $scope.marketPrice,
  //       status          :   $scope.newStatus.selected,
  //     };
  //
  //     console.log("controllerNewProperty",newProperty);
  //     Property.create(newProperty);
  //
  //   };

  //   $scope.newRegion = {
  //     address: [
  //       'North America',
  //       'Central America',
  //       'South America',
  //       'Europe',
  //       'Scandanavia',
  //       'Middle East',
  //       'Asia'
  //     ],
  //     selected: 'North America'
  //   };
  //
  //   $scope.newRating = {
  //     rate: [
  //       '$',
  //       '$$',
  //       '$$$',
  //       '$$$$',
  //       '$$$$$',
  //       '$$$$$$$'
  //
  //     ],
  //     selected: '$'
  //   };
  //
  //   $scope.newStatus = {
  //     status: [
  //       'Listed',
  //       'Purchased',
  //       'Low Interest',
  //       'High Interest',
  //       'Special Interest'
  //     ],
  //     selected: 'Listed'
  //   };
  //
  //
  //   // ---  CLIENT --- //
  //
  //
  //   $scope.createClient = () => {
  //     var newClient = {
  //       difficulty  :   $scope.difficulty.selected,
  //       category    :   $scope.category.selected,
  //       question    :   $scope.question,
  //       answer      :   $scope.answer,
  //     };
  //
  //     console.log("controllerNewClient",newClient);
  //     Client.create(newClient);
  //     $scope.difficulty.selected = "";
  //     $scope.category.selected = "";
  //     $scope.question = "";
  //     $scope.answer = "";
  //   };
  // });
  //
  // app.controller('editPropertiesCtrl', function ($scope, Property, $state, property) {
  //   console.log("editPropertiesCtrl");
  //
  //   var data = property;
  //   console.log('property.data=>\n',property.data);
  //
  //   $scope.country      = data.address.country;
  //   $scope.city         = data.address.city;
  //   $scope.state        = data.address.state;
  //   $scope.street       = data.address.street;
  //   $scope.zip          = data.address.zip;
  //   $scope.listPrice    = data.listPrice;
  //   $scope.marketPrice  = data.marketPrice;
  //
  //   $scope.editRegion = {
  //     address: [
  //       'North America',
  //       'Central America',
  //       'South America',
  //       'Europe',
  //       'Scandanavia',
  //       'Middle East',
  //       'Asia'
  //     ],
  //     selected: `${data.address.region}`
  //   };
  //
  //   $scope.editRating = {
  //     rate: [
  //       '$',
  //       '$$',
  //       '$$$',
  //       '$$$$',
  //       '$$$$$',
  //       '$$$$$$$'
  //
  //     ],
  //     selected: `${data.customerRating}`
  //   };
  //
  //   $scope.editStatus = {
  //     status: [
  //       'Listed',
  //       'Purchased',
  //       'Low Interest',
  //       'High Interest',
  //       'Special Interest'
  //     ],
  //     selected: `${data.status}`
  //   };
  //
  //   $scope.submitEdit = () => {
  //     var newAddress = {
  //       region       : $scope.editRegion.selected,
  //       country      : $scope.country,
  //       city         : $scope.city,
  //       state        : $scope.state,
  //       street       : $scope.street,
  //       zip          : $scope.zip,
  //     }
  //     var submitProperty = {
  //       _id             : data._id,
  //       address         : newAddress,
  //       listPrice       : $scope.listPrice,
  //       customerRating  : $scope.editRating.selected,
  //       marketPrice     : $scope.marketPrice,
  //       status          : $scope.editStatus.selected
  //     }
  //     console.log("submit Property", submitProperty);
  //
  //     Property.edit(submitProperty);
  //     Property.getProperties()
  //     .then(newProperties => {
  //       console.log("here are the edited properties\n",newProperties.data);
  //       //$scope.buttonName = "Change Complete!";
  //     });
  //   };
  // });
