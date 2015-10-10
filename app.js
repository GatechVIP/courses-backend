//config middleware
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var port = process.env.PORT || '3000';

var app = express();

// view setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//other middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route setup
app.use('/', routes);

// error handlers
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send( err.stack );
  });
}

app.listen(port);

module.exports = app;
