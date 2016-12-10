angular.module('starter.services', [])
.factory('totoData', function($http, $q){
	return {
		auth: function(user, pass){
			var def = $q.defer();
			$http.post('http://app.totobet.info/manager.app', {
				action: 'logonUser',
				user: user,
				pass: pass
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
