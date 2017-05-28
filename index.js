var repeat = require('repeat');
var express = require('express');
var app = express();
var QuickBase = require('quickbase'); 

var quickbase = new QuickBase({
	realm: 'team',
	//appToken: 'application token',
	userToken: 'b287yg_uyp_dsagzw8b755gx7bvr8hfmdp3fu53'
});

function sayHello() {
/*
d = new Date();
d.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
d.toLocaleDateString();   // -> "2/1/2013"
d.toLocaleTimeString();  // -> "7:38:05 AM"
*/
var seconds = new Date().toLocaleString();

  quickbase.api('API_AddRecord', {
	dbid: 'bmp25zq2a',           /* Required */
	fields: [                    /* Required */
		{ fid: 6, value: seconds }
	],
	disprec: false,
	fform: false,
	ignoreError: false,
	msInUTC: false
}).then((results) => {
	console.log(results); 
	/* results = {
	 * 	action: 'API_AddRecord',
	 * 	errcode: 0,
	 * 	errtext: 'No error',
	 * 	rid: 21,
	 * 	update_id: 1206177014451
	 * }
	*/
}).catch((error) => {
	console.log(error); 
	// Handle error
});
};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	//sayHello(); 
  response.render('pages/index');
});

app.get('/addrecord', function(request, response) {
  sayHello(); 
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

repeat(sayHello).every(10000, 'ms').for(10000, 'minutes').start.in(5, 'sec');


