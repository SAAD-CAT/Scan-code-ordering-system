var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connect = require('connect');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

require('./models/food_model.js');
require('./models/order_model.js');
require('./models/restaurant_model.js');

var conn = mongoose.connect('mongodb://localhost:27017/mydatabase');
//console.log(conn.connections[0].collections);

var app = express();
app.use(bodyParser());
//app.use(bodyParser.text());  //req.body
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser());
// app.use(bodyParser.json());  //req.body
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('ZhongziL')); 	//req.cookie
app.use(session({
	secret: 'ZhongziL',
	cookies: {maxAge: 60*60*1000}, 	//1h
	store: new mongoStore({
		url: 'mongodb://localhost:27017/mydatabase',
		//db: mongoose.connection.db, //connect error
		collection: 'sessions'
	})
}));					//req.session

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

require('./routers/auth_router')(app);
app.listen(80);

console.log("the web-server is running on port 80");
