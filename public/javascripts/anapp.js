var kvafeed = angular.module('kvafeed', []);

kvafeed.controller('mainController', ['$scope','$http', function($scope, $http) {
	$http.get('/kvafeed')
		.success(function(data){
			$scope.feed = data;
			console.log(data);
		})
		.error(function(data) {
            console.log('Error: ' + data);
        });	
}]);