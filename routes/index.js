var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var http = require('http');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendfile('./public/index.html');
  //res.render('index', { title: 'Express' });
});

router.get('/kvafeed', function(req, res, next) {
	var kvaurl = "http://www.kyauandalbert.com/EuphonicSessions-Podcast-KyauandAlbert.xml";
	var options = {
	  hostname: 'www.kyauandalbert.com',
	  port: 80,
	  path: '/EuphonicSessions-Podcast-KyauandAlbert.xml',
	  method: 'GET',
	};
	feedxml = '';
	http.get(kvaurl, (res) => {
	  console.log(`Got response: ${res.statusCode}`);
	  res.setEncoding('utf8');
	  res.on('data', function(chunk){
		  feedxml += chunk;
	  });
	  
	  // consume response body
	  res.resume();
	}).on('error', (e) => {
	  console.log(`Got error: ${e.message}`);
	}).on('close', function(){
		parseString(feedxml, function (err, result) {
			console.log('error ml parser', err);
			res.json(result);
			console.log(result);
		});
	  });
  
	
	
	feed = {'name': 'Kyau', 'age' : 23};
  //res.json(feed);
});

module.exports = router;
