var express = require('express');
var router = express.Router();
var coursesJson = require('../public/javascripts/bak.json');
var fs = require('fs');
//index
router.get('/', function(req, res, next) {
  res.send('You are now at the index.');
});

//routing for providing simple JSON data


//get all courses of a specific subject
router.get('/api/course/:subject', function(req, res) {
	var subject = req.params.subject;
	var courses = [];
	for(var course in coursesJson) {
		var corrected = {};
		var words = string1.split(' ');
		words[0]
		courses.push({

		})
	}
	//var courseNames = Object.keys(coursesJson);
	res.send("course.");
});

module.exports = router;