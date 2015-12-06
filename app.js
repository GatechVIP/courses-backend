//config middleware
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var assert = require('assert');
var monk = require('monk');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var app = module.exports = express();



// middleware setup

// set up mongodb
var uri = "mongodb://test:123@ds045464.mongolab.com:45464/courses-backend";
var db = monk(uri);
app.db = db;
//console.log(courses);

// other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/views')));

//route setup
var routes = require('./routes/index');
app.use('/', routes);

// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err);
});

//start the server
app.listen(server_port, server_ip_address, function(){
  console.log("Listening on server_port " + server_port)
});

//module.exports = app;