angular.module('starter.services', [])
.factory('totoData', function($http, $q){
  var headers = {
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }
	return {
		auth: function(user, pass){
			var def = $q.defer();
			$http.post('http://app.totobet.info/manager.app', {
				action: 'logonUser',
				user: user,
				pass: pass
			}, {
         headers: headers
      }).success(function(data, status, headers, config){
				def.resolve(data);
			}).error(function(data, status, headers, config){
				def.reject(data);
			});
			return def.promise;
		},
		getFils: function(uid){
			var def = $q.defer();
			$http.post('http://app.totobet.info/manager.app', {
				action: 'getFils',
				uid: uid
			}, {
         headers: headers
      }).success(function(data, status, headers, config){
				def.resolve(data);
			}).error(function(data, status, headers, config){
				def.reject(data);
			});
			return def.promise;
		},
    getFinInfo: function(uid, filId){
      var def = $q.defer();
      $http.post('http://app.totobet.info/manager.app', {
        action: 'getFinInfo',
        uid: uid,
        filid: filId
      }, {
         headers: headers
      }).success(function(data, status, headers, config){
        def.resolve(data);
      }).error(function(data, status, headers, config){
        def.reject(data);
      });
      return def.promise;
    },
    getStatsInfo: function(uid, filId, period){
      var def = $q.defer();
      $http.post('http://app.totobet.info/manager.app', {
        action: 'getStatsInfo',
        uid: uid,
        filid: filId,
        period: period
      }, {
         headers: headers
      }).success(function(data, status, headers, config){
        def.resolve(data);
      }).error(function(data, status, headers, config){
        def.reject(data);
      });
      return def.promise;
    },
    getByDaysInfo: function(uid, filId, period){
      var def = $q.defer();
      $http.post('http://app.totobet.info/manager.app', {
        action: 'getByDaysInfo',
        uid: uid,
        filid: filId,
        period: period
      }, {
         headers: headers
      }).success(function(data, status, headers, config){
        def.resolve(data);
      }).error(function(data, status, headers, config){
        def.reject(data);
      });
      return def.promise;
    }

	};
})
.factory('lstorage', function(){
return {
   set: function(key, value){
      return localStorage.setItem(key, JSON.stringify(value));
   },
   get: function(key){
     return JSON.parse(localStorage.getItem(key));
   },
   remove: function(key){
     return localStorage.removeItem(key);
   },
   isRemembered: function(){
    if(localStorage.getItem("remembered")){
      return true;
    }else{
      return false;
    }
   }
 };
})
.factory('utils', function($ionicLoading, $ionicPopup){
    var functionObj={};

    functionObj.showLoad=function(){
      $ionicLoading.show({
        content: '<i class=" ion-loading-c"></i> ',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };
    functionObj.hideLoad=function(){
      $ionicLoading.hide();
    };
    functionObj.showAlert = function(title,message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    };

    return functionObj;
})
