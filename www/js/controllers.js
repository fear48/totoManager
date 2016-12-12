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
    $scope.filId = data.fils[0].id;
    $scope.total = 0;
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

    }, function(err){
      alert(err);
    });

  $scope.refresh = function(){
    console.log($scope.filId);
    $scope.total = 0;
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
.controller('statsCtrl', function($scope, lstorage, totoData, utils, MonthPicker){
  var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var d = new Date();
  $scope.monthTitle = monthNames[d.getMonth()] + ', ' + d.getFullYear();
  
  function getMonthFormatted(month) {
    month++;
    return month < 10 ? '0' + month : month;
  }

  MonthPicker.init({
    minYear: new Date().getFullYear()-2,
    monthLabels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    title: "Выбрать месяц",
    cancelText: "Отмена",
    cancelClass: "button-positive"
  });

  $scope.buttonTap = function() {
    MonthPicker.show(function(res) {
        console.log(res);
        $scope.fperiod = res.year + '-' + getMonthFormatted(res.month);
        console.log($scope.fperiod);
        if(typeof res.month !== 'undefined'){
          utils.showLoad();
          $scope.monthTitle = monthNames[res.month] + ', ' + res.year;
          totoData.getStatsInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
            $scope.statsInfo = data;
            utils.hideLoad();
            console.log(data);
            
            utils.hideLoad();
          }, function(err){
            console.log(err);
          });
        }
    });
  }

  totoData.getFils(lstorage.get("uid")).then(function(data){
      $scope.fils = data.fils;
      $scope.filId = data.fils[0].id;
      $scope.fperiod = d.getFullYear() + '-' + getMonthFormatted(d.getMonth());
      console.log($scope.filId);
      utils.showLoad();
      totoData.getStatsInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
        $scope.statsInfo = data;
        console.log(data);
        utils.hideLoad();
      }, function(err){
        console.log(err);
      });

    }, function(err){
      alert(err);
    });

  $scope.refresh = function(){
    utils.showLoad();
    totoData.getStatsInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
      $scope.statsInfo = data;
      console.log(data);
      
      utils.hideLoad();
    }, function(err){
      console.log(err);
    });
  };

  $scope.loadInfo = function(filId){
    $scope.filId = filId;
    utils.showLoad();
    totoData.getStatsInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
      $scope.statsInfo = data;
      console.log(data);
      
      utils.hideLoad();
    }, function(err){
      console.log(err);
    });
  };

})
.controller('costsCtrl', function($scope, lstorage, totoData, utils) {
  
})
.controller('reportCtrl', function($scope, lstorage, totoData, utils, MonthPicker) {
  var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var d = new Date();
  $scope.monthTitle = monthNames[d.getMonth()] + ', ' + d.getFullYear();
  
  function getMonthFormatted(month) {
    month++;
    return month < 10 ? '0' + month : month;
  }

  MonthPicker.init({
    minYear: new Date().getFullYear()-2,
    monthLabels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    title: "Выбрать месяц",
    cancelText: "Отмена",
    cancelClass: "button-positive"
  });

  $scope.buttonTap = function() {
    MonthPicker.show(function(res) {
        console.log(res);
        $scope.fperiod = res.year + '-' + getMonthFormatted(res.month);
        console.log($scope.fperiod);
        if(typeof res.month !== 'undefined'){
          $scope.totalsum1 = 0;
          $scope.totalsum2 = 0;
          $scope.totalsum3 = 0;
          utils.showLoad();
          $scope.monthTitle = monthNames[res.month] + ', ' + res.year;
          totoData.getByDaysInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
            $scope.days = data.bydays;
            if(data.bydays){
              for(var i = 0; i < data.bydays.length; i++){
                $scope.totalsum1 += data.bydays[i].sum1;
                $scope.totalsum2 += data.bydays[i].sum2;
                $scope.totalsum3 += data.bydays[i].sum3;
              }
            }
            utils.hideLoad();
            console.log(data);
            
            utils.hideLoad();
          }, function(err){
            console.log(err);
          });
        }
    });
  }

  totoData.getFils(lstorage.get("uid")).then(function(data){
      $scope.fils = data.fils;
      $scope.filId = data.fils[0].id;
      $scope.fperiod = d.getFullYear() + '-' + getMonthFormatted(d.getMonth());
      $scope.totalsum1 = 0;
      $scope.totalsum2 = 0;
      $scope.totalsum3 = 0;
      console.log(typeof parseInt($scope.filId));
      console.log($scope.fperiod);
      utils.showLoad();
      totoData.getByDaysInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
        $scope.statsInfo = data;
        if(data.bydays){
          for(var i = 0; i < data.bydays.length; i++){
            $scope.totalsum1 += data.bydays[i].sum1;
            $scope.totalsum2 += data.bydays[i].sum2;
            $scope.totalsum3 += data.bydays[i].sum3;
          }
        }
        console.log(data);
        utils.hideLoad();
      }, function(err){
        console.log(err);
      });

    }, function(err){
      alert(err);
    });

  $scope.refresh = function(){
    $scope.totalsum1 = 0;
    $scope.totalsum2 = 0;
    $scope.totalsum3 = 0;

    utils.showLoad();
    totoData.getByDaysInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
      $scope.days = data.bydays;
      if(data.bydays){
        for(var i = 0; i < data.bydays.length; i++){
          $scope.totalsum1 += data.bydays[i].sum1;
          $scope.totalsum2 += data.bydays[i].sum2;
          $scope.totalsum3 += data.bydays[i].sum3;
        }
      }
      console.log(data);
      
      utils.hideLoad();
    }, function(err){
      console.log(err);
    });
  };

  $scope.loadInfo = function(filId){
    $scope.filId = filId;
    $scope.totalsum1 = 0;
    $scope.totalsum2 = 0;
    $scope.totalsum3 = 0;

    utils.showLoad();
    totoData.getByDaysInfo(lstorage.get("uid"), $scope.filId, $scope.fperiod).then(function(data){
      $scope.days = data.bydays;
      if(data.bydays){
        for(var i = 0; i < data.bydays.length; i++){
          $scope.totalsum1 += data.bydays[i].sum1;
          $scope.totalsum2 += data.bydays[i].sum2;
          $scope.totalsum3 += data.bydays[i].sum3;
        }
      }
      console.log(data);
      
      utils.hideLoad();
    }, function(err){
      console.log(err);
    });
  };
})
.controller('addcostCtrl', function($scope, lstorage, totoData, utils) {
  
});