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
		}
	};
});
