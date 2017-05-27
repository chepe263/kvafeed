var kvafeed = angular.module('kvafeed', []);

kvafeed.controller('mainController', ['$scope','$http', function($scope, $http) {
	
	$scope.podcasts = {
	//,{'name': '', 'label': '', 'url': ''}
		'kva' :  {'name': 'kva', 'label': 'Euphonic Sessions with Kyau & Albert', 'url': 'http://www.kyauandalbert.com/EuphonicSessions-Podcast-KyauandAlbert.xml'}
		,'abgt': {'name': 'abgt', 'label': 'Group Therapy with Above & Beyond', 'url': 'http://static.aboveandbeyond.nu/grouptherapy/podcast.xml'}
		,'glowradio': {'name': 'glowradio', 'label': 'Glow Radio', 'url': 'http://clubglow.podOmatic.com/rss2.xml'}
		,'corsten': {'name': 'corsten', 'label': 'Corsten\'s Countdown', 'url': 'http://ferrycorsten.podtree.com/feed/podcast/'}
		,'departure': {'name': 'departure', 'label': 'International Departures with Shane 54', 'url': 'http://internationaldepartures.podbean.com/feed/'}
		,'gdjb': {'name': 'gdjb', 'label': 'Markus Schulz Presents Global DJ Broadcast', 'url': 'http://gdjb.podbean.com/feed/'}
		,'ridefm': {'name': 'ridefm', 'label': 'Ride Radio by Myon', 'url': 'https://rideradio.podbean.com/feed/'}
		,'andeeped': {'name': 'andeeped', 'label': 'The Anjunadeep Edition by Anjunadeep', 'url': 'http://static.anjunadeep.com/edition/podcast.xml'}
		,'anjunawww': {'name': 'anjunawww', 'label': 'Anjunabeats Worldwide by Anjunabeats', 'url': 'https://static.anjunabeats.com/anjunabeats-worldwide/podcast.xml'}

	};
	$scope.updateFeed = function(val){
		val = val || 'kva';
		feedUrl = $scope.podcasts[val].url;
		document.title = $scope.podcasts[val].label;
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
		
		sessionStorage.setItem('last_selected_feed', selectedFeed);
		$scope.updateFeed(selectedFeed);
	}
	$scope.selectedFeed = sessionStorage.getItem('last_selected_feed') || 'kva';
	$scope.changeSelect(sessionStorage.getItem('last_selected_feed') || 'kva');
	//document.getElementById('feed').value = "kva";
}]);
