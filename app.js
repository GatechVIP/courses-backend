//config middleware
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var port = process.env.PORT || '3000';

var app = express();

// view setup
//other middleware setup
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

app.listen(port, function(success, failure) {
	console.log('server is running on port ' + port);
}).on('error', function(err) {
	console.log(err)
});

module.exports = app;