angular.module('starter.controllers', [])
.controller('AuthCtrl', function($scope, totoData, $http){
  $scope.loginData = {};
  
  $scope.doLogin = function() {

    
    console.log('Doing login', $scope.loginData);
    totoData.auth($scope.loginData.username, $scope.loginData.password).then(function(data){
      alert(JSON.stringify(data));
    }, function(err){
      alert(JSON.stringify(err));
    });
  };
})
.controller('AppCtrl', function($scope) {

})
