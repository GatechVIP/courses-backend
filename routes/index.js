var express = require('express');
var router = express.Router();
var coursesJson = require('../public/javascripts/courses.json');
var fs = require('fs');
//index
router.get('/', function(req, res, next) {
  res.send('You are now at the index.');
});

//routing for providing simple JSON data


//get all courses
router.get('/api/course', function(req, res) {
	var courses = [];
	for (var course in coursesJson) {
		courses.push(coursesJson[course]);
	}
	res.json(courses);
})

//get all courses of a specific subject
router.get('/api/course/:subject', function(req, res) {
	var subject = req.params.subject;
	if(subject != null) {
		subject = subject.toUpperCase();
		var courses = [];
		for(var course in coursesJson) {
			if (coursesJson[course].subject == subject)
			courses.push(coursesJson[course]);
		}
		res.send(courses);

	}
});

//get the specified course
router.get('/api/course/:subject/:number', function (req, res) {
	var subject = req.params.subject;
	var number = req.params.number;
	if(subject != null && number != null) {
		subject = subject.toUpperCase();
		var course = coursesJson["" + subject + number];
		if (course != null) {
			res.send(course);
		}
	}
});

module.exports = router;