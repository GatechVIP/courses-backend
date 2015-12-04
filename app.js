//config middleware
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var routes = require('./routes/index');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var app = express();




// middleware setup

// set up mongodb
var uri = "mongodb://test:123@ds045464.mongolab.com:45464/courses-backend";
MongoClient.connect(uri, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to the database server.");
  db.close();
});


// other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/views')));

//route setup
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

module.exports = app;