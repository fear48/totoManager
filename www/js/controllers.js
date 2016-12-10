angular.module('starter.controllers', [])
.controller('AuthCtrl', function($scope, $state, $ionicPopup, totoData, lstorage, utils){
  $scope.loginData = {};

  $scope.doLogin = function() {
    totoData.auth($scope.loginData.username, $scope.loginData.password).then(function(data){
      if(data.errcode){
        utils.showAlert("Ошибка авторизации", data.errtext);
      }else{
        $state.go('app.main');
        console.log(data);
        lstorage.set("uid", data.uid);
        lstorage.set("flname", data.name1 + ' ' + data.name2);
      }
    }, function(err){
      alert(err);
    });
  };
})
.controller('mainCtrl', function($scope, lstorage) {
  $scope.name = lstorage.get("flname");
})
.controller('AppCtrl', function($scope, $state, lstorage) {
  $scope.logout = function(){
    lstorage.remove("uid");
    lstorage.remove("flname");
    $state.go('auth');
  };
})
.controller('fillsCtrl', function($scope, lstorage, totoData, utils) {
  utils.showLoad();
  totoData.getFils(lstorage.get("uid")).then(function(data){
    $scope.fils = data.fils;
    utils.hideLoad();
  }, function(err){
    alert(err);
  });
})
