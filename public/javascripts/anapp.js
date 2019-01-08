var kvafeed = angular.module('kvafeed', []);

kvafeed.controller('mainController', ['$scope','$http', function($scope, $http) {
	
	$scope.podcasts = {
	//,{'name': '', 'label': '', 'url': ''}
		'kva' :  {'name': 'kva', 'label': 'Euphonic Sessions with Kyau & Albert', 'url': 'http://www.kyauandalbert.com/EuphonicSessions-Podcast-KyauandAlbert.xml'}
		,'abgt': {'name': 'abgt', 'label': 'Group Therapy with Above & Beyond', 'url': 'http://static.aboveandbeyond.nu/grouptherapy/podcast.xml'}
		,'departure': {'name': 'departure', 'label': 'International Departures with Shane 54', 'url': 'http://internationaldepartures.podbean.com/feed/'}
		,'gdjb': {'name': 'gdjb', 'label': 'Markus Schulz Presents Global DJ Broadcast', 'url': 'http://gdjb.podbean.com/feed/'}
		,'ridefm': {'name': 'ridefm', 'label': 'Ride Radio by Myon', 'url': 'https://rideradio.podbean.com/feed/'}
		,'andeeped': {'name': 'andeeped', 'label': 'The Anjunadeep Edition by Anjunadeep', 'url': 'http://static.anjunadeep.com/edition/podcast.xml'}
		,'anjunawww': {'name': 'anjunawww', 'label': 'Anjunabeats Worldwide by Anjunabeats', 'url': 'https://static.anjunabeats.com/anjunabeats-worldwide/podcast.xml'}
		,'glowradio': {'name': 'glowradio', 'label': 'Glow Radio', 'url': 'http://glowradio.podomatic.com/rss2.xml'}
		,'corsten': {'name': 'corsten', 'label': 'Corsten\'s Countdown', 'url': 'http://ferrycorsten.podtree.com/feed/podcast/'}
		,'togetherweare': {'name': 'togetherweare', 'label': 'Together FM by Arty', 'url': 'http://artymusic.podbean.com/feed/'}
		,'asotpod': {'name': 'asotpod', 'label': 'A State of Trance Official Podcast', 'url': 'http://podcast.armadamusic.com/asot/podcast.xml'}
		,'soundofeco': {'name': 'soundofeco', 'label': 'The Sound of You(th) by Eco', 'url': 'http://feeds.soundcloud.com/users/soundcloud:users:299597/sounds.rss'}
		,'findyourharmony': {'name': 'findyourharmony', 'label': 'Find your Harmony by Andrew Rayel', 'url': 'http://andrewrayel.podbean.com/feed/'}
		,'I_like_it_pure': {'name': 'I_like_it_pure', 'label': 'Pure Trance Radio by Solarstone', 'url': 'https://www.thisisdistorted.com/repository/xml/SolarstonePureTrance1463143743.xml'}
		,'Mixmash_Radio': {'name': 'Mixmash_Radio', 'label': 'Mixmash Radio by Laidback Luke', 'url': 'http://feeds.soundcloud.com/users/soundcloud:users:349864211/sounds.rss'}
		,'NightMusic': {'name': 'NightMusic', 'label': 'The Thrillseekers\' NightMusic Podcast', 'url': 'http://www.thethrillseekers.co.uk/podcast/thrillseekers_podcast.xml'}
		,'Obscured_Arrangement': {'name': 'Obscured_Arrangement', 'label': 'Obscured Arrangement', 'url': 'https://ia902605.us.archive.org/6/items/ObscuredArrangement/feed.xml'}
		,'OBSCVRA': {'name': 'OBSCVRA', 'label': 'Obscured Arrangement: OBSCVRA', 'url': 'https://ia800103.us.archive.org/24/items/OBSCVRA/feed.xml'}
		,'hatopod_nirvana': {'name': 'hatopod_nirvana', 'label': 'Heart Shaped Pod by Adam Tod Brown and Travis Clark', 'url': 'https://feeds.megaphone.fm/UNP6134193256'}
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
		
		localStorage.setItem('last_selected_feed', selectedFeed);
		$scope.updateFeed(selectedFeed);
	}
	$scope.selectedFeed = localStorage.getItem('last_selected_feed') || 'kva';
	$scope.changeSelect($scope.selectedFeed);
	$scope.formatDate = function(whatdate)
		{
			return moment(whatdate).format('YYYY-MMM-DD');
		}
	//$scope.changeSelect(localStorage.getItem('last_selected_feed') || 'kva');
	//document.getElementById('feed').value = "kva";
}]);
