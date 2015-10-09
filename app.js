var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var port = process.env.PORT || 3000;

//configure express
app.set('port', port);
app.set('view engine', 'ejs');

//set up initial routing
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/app/index.html'));
    //res.render('app/index', {});
});

//start the server
var server = app.listen(port, function() {
    console.log("listening on port " + port);
});

module.exports = app;