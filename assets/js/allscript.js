/* Stage- Bootstrap one page Event ticket booking theme 
Created by pixpalette.com - online design magazine */

jQuery(document).ready(function(){
    $(window).load(function() {
        // Animate loader off screen
        $(".loader").fadeOut("slow");
    
        var app = new Vue({
            el: '#app',
            data: {
                podcasts: {
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
                    },
                    selected_feed: null,
                    selected_feed_data: null,
                    ready: false,
                    block_ui: false,
                    current_feed_image: null,
                    current_podcast_item: {},
                    show_list: true,
                    show_item_details: false,
            },
            computed: {
                /*'feeds': function(){
                    return Object.keys(this.podcasts);
                },*/
                current_feed: function(){
                    if(this.selected_feed !== null){
                        return this.podcasts[this.selected_feed];
                    }
                    return null;

                },
            },
            watch: {
                selected_feed: function(oldVal, newVal){
                    this.block_ui = true;
                    var self = this;
                    this.return_to_list();
                    if(sessionStorage.getItem("last_selected_feed_data_" + this.current_feed.name)){
                        this.selected_feed_data = JSON.parse( sessionStorage.getItem("last_selected_feed_data_" + this.current_feed.name));
                        self.current_feed_image = this.selected_feed_data.channel.image;
                        self.block_ui = false;
                    } else {
                        axios.get('/api/v1/feed', {
                            params: {
                                'url': self.current_feed.url
                            }
                        })
                        .then(function(response){
                            self.selected_feed_data = response.data;
                            self.current_feed_image = response.data.channel.image;
                            sessionStorage.setItem("last_selected_feed_data_" +  self.current_feed.name, JSON.stringify(response.data) );
                            self.block_ui = false;
                        })
                        .catch(function(error){
                            //hopefully this cancels the change
                            self.selected_feed = oldVal
                        });
                    }
                    localStorage.setItem("last_selected_feed_", this.selected_feed);
    
                }
            },
            created: function(){
                if(localStorage.getItem("last_selected_feed")){
                    this.selected_feed = localStorage.getItem("last_selected_feed");
                } else {
                    this.selected_feed = 'kva';
                }
            },
            mounted: function(){
                this.ready = true;
            },
            filters: {
                file_sizes: function(data){
                    return filesize(data);

                },
                formatDate: function(whatdate){
                    return moment(whatdate).format('YYYY-MMM-DD');
                }
            },
            methods: {
                details: function(index){
                    this.show_list = false;
                    this.show_item_details = true;
                    this.current_podcast_item = this.selected_feed_data.channel.items[index]
                    console.log(this.selected_feed_data)
                },
                return_to_list: function(){
                    this.show_list = true;
                    this.show_item_details = false;
                },
            },
        });
    });
});
