'use strict';

var app = angular.module('authentiSpace', [ 'ui.bootstrap', 'ui.router', 'oitozero.ngSweetAlert' ]);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('home', {
    url           : '/' ,
    templateUrl   : 'html/home.html' ,
    controller    : 'loginCtrl'
  })
  // .state('profile', {
  //   url           : '/profile/:user' ,
  //   templateUrl   : 'html/profile.html' ,
  //   controller    : 'profileCtrl',
  //   params        : { userInfo : null }
  // })
  .state('signUp', {
    url           : '/sign-up',
    templateUrl   : 'html/signUp.html',
    controller    : 'signUpCtrl'
  })
  .state('profile', {
    url           : '/profile',
    templateUrl   : 'html/profile.html',
    controller    : 'profileCtrl',
    resolve       : {
      profile: function(User, $q, $state){
        return User.getProfile()
        .catch(() => {
          $state.go('home');
          return $q.reject();
        });
      }
    }
  })
  // .state('logout'){
  //   url           : '/logout',
  //   templateUrl   : 'html/logout',
  //   controller    : 'logoutCtrl'
  // }

  $urlRouterProvider.otherwise('/');
});

  // .state('addProperty', {
  //   url           : '/addProperty' ,
  //   templateUrl   : 'html/addProperty.html' ,
  //   controller    : 'addCtrl'
  // })
  // .state('editProperties', {
  //   url           : '/editProperties/:id' ,
  //   templateUrl   : 'html/editProperties.html' ,
  //   controller    : 'editPropertiesCtrl',
  //   resolve       : {
  //     property : function(Property, $stateParams){
  //
  //       return Property.getPropertyById($stateParams)
  //     }
  //   }
  // })
  // .state('clients', {
  //   url           : '/clients' ,
  //   templateUrl   : 'html/clients.html' ,
  //   controller    : 'clientsCtrl'
  // })
  // .state('database', {
  //   url           : '/database' ,
  //   templateUrl   : 'html/database.html' ,
  //   controller    : 'databaseCtrl'
  // });

  // .state('< name >', {
  //   url           : '< / >' ,
  //   templateUrl   : '< / >' ,
  //   controller    : '< / >' ,
  //   resolve       : ' { < CONTROLLER PROP. NAME > : function( < PARAMS > ){ return < SERVICE NAME.METHOD( <PARAMS> ) > } }'
  // })


  ; // END OF .state(s)
