angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-monthpicker'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $httpProvider, $urlRouterProvider){
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('auth', {
    url: '/auth',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })
  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      }
    }
  })
  .state('app.finance', {
    url: '/finance',
    views: {
      'menuContent': {
        templateUrl: 'templates/finance.html',
        controller: 'financeCtrl'
      }
    }
  })
  .state('app.stats', {
    url: '/stats',
    views: {
      'menuContent': {
        templateUrl: 'templates/stats.html',
        controller: 'statsCtrl'
      }
    }
  })
  .state('app.costs', {
    url: '/costs',
    views: {
      'menuContent': {
        templateUrl: 'templates/costs.html',
        controller: 'costsCtrl'
      }
    }
  })
  .state('app.report', {
    url: '/report',
    views: {
      'menuContent': {
        templateUrl: 'templates/report.html',
        controller: 'reportCtrl'
      }
    }
  })
  .state('app.addcost', {
    url: '/addcost',
    views: {
      'menuContent': {
        templateUrl: 'templates/addcost.html',
        controller: 'addcostCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise(function($injector){
    var state = $injector.get('$state');
    var lstorage = $injector.get('lstorage');
    if(lstorage.get("isRemembered")){
      state.go("app.main");
    }else{
      state.go("auth");
    }
  });
});