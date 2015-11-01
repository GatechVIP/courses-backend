var express = require('express');
var api = require('./api.js');
/* GET home page. */
app.get('/', function(req, res, next) {
  res.send('You are now at the index.');
});

app.use('/api/', api);

module.exports = app;
