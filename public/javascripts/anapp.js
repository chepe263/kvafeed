var kvafeed = angular.module('kvafeed', []);

kvafeed.controller('mainController', ['$scope','$http', function($scope, $http) {
	//$scope.selectedFeed = 'kva';
	$scope.podcasts = {
	//,{'name': '', 'label': '', 'url': ''}
		'kva' :  {'name': 'kva', 'label': 'Euphonic Sessions with Kyau & Albert', 'url': 'http://www.kyauandalbert.com/EuphonicSessions-Podcast-KyauandAlbert.xml'}
		,'abgt': {'name': 'abgt', 'label': 'Group Therapy with Above & Beyond', 'url': 'http://static.aboveandbeyond.nu/grouptherapy/podcast.xml'}
	};
	$scope.updateFeed = function(val){
		val = val || 'kva';
		feedUrl = $scope.podcasts[val].url;
		cachedFeed = sessionStorage.getItem('cache_feed_' + val);
		if (cachedFeed){
			$scope.feed = JSON.parse(cachedFeed);
			return;
		}
		$http.get('https://podcast-parser.herokuapp.com/feed?url=' + encodeURIComponent(feedUrl))
			.success(function(data){
				$scope.feed = data;
				sessionStorage.setItem('cache_feed_' + val, JSON.stringify(data));
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});	
	};
	$scope.changeSelect = function(selectedFeed){
		//console.log("ldld ", selectedFeed)
		//$scope.updateFeed(document.getElementById('feed').value);
		$scope.updateFeed(selectedFeed);
	}
	$scope.updateFeed('kva');
	//document.getElementById('feed').value = "kva";
}]);