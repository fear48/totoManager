angular.module('starter.controllers', [])
.controller('AuthCtrl', function($scope, $state, $ionicPopup, totoData, lstorage, utils){
  $scope.loginData = {};

  $scope.doLogin = function() {
    totoData.auth($scope.loginData.username, $scope.loginData.password).then(function(data){
      if(data.errcode){
        utils.showAlert("Ошибка авторизации", data.errtext);
      }else{
        $state.go('app.main');
        if($scope.loginData.isRemembered){
          lstorage.set("isRemembered", true);
        }
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
    lstorage.remove("isRemembered");
    $state.go('auth');
  };
})
.controller('financeCtrl', function($scope, lstorage, totoData, utils) {
  totoData.getFils(lstorage.get("uid")).then(function(data){
    $scope.fils = data.fils;
    console.log(data.fils);
  }, function(err){
    alert(err);
  });

  $scope.refresh = function(){
    console.log($scope.filId);
    if(typeof $scope.filId !== 'undefined'){
      utils.showLoad();
      totoData.getFinInfo(lstorage.get("uid"), $scope.filId).then(function(data){
        $scope.finInfo = data;
        for(var i = 0; i < data.pplist.length; i++){
          $scope.total += data.pplist[i].ost;
        }
        utils.hideLoad();
      }, function(err){
        console.log(err);
      });
    }
  };

  $scope.loadInfo = function(filId){
    $scope.filId = filId;
    $scope.total = 0;
    if(typeof filId !== 'undefined'){
      utils.showLoad();
      totoData.getFinInfo(lstorage.get("uid"), filId).then(function(data){
        $scope.finInfo = data;
        for(var i = 0; i < data.pplist.length; i++){
          $scope.total += data.pplist[i].ost;
        }
        utils.hideLoad();
      }, function(err){
        console.log(err);
      });
    }
  };
})
.controller('statsCtrl', function($scope, lstorage, totoData, utils) {
  
})
.controller('costsCtrl', function($scope, lstorage, totoData, utils) {
  
})
.controller('reportCtrl', function($scope, lstorage, totoData, utils) {
  
})
.controller('addcostCtrl', function($scope, lstorage, totoData, utils) {
  
});