var express = require('express');
var app = require('../app.js');
var router = express.Router();
var coursesJson = require('../public/javascripts/courses.json');
var fs = require('fs');
var coursecritique = require('../modules/coursecritique.js');
var path = require('path');
// define collection from the database
var coursesCollection = app.db.get('courses');


//index
router.get('/', function(req, res, next) {
  //send simple html file
  res.sendFile('index.html');
});

//routing for providing data from the database


//get all courses
router.get('/api/db/course', function(req, res) {
	var promise = coursesCollection.find();
	promise.success(function (doc) {
		res.send(doc);
	});
});

//get all courses of a specific subject
router.get('/api/db/course/:subject', function(req, res) {
	var reqSubject = req.params.subject;
	if (reqSubject != null) {
		reqSubject = reqSubject.toUpperCase();
		var promise = coursesCollection.find({subject: reqSubject}, {fields: {'_id': false}});
		promise.success(function (doc) {
				res.send(doc);
		});
	}

});

//get the specified course
router.get('/api/db/course/:subject/:number', function (req, res) {
	var reqSubject = req.params.subject;
	var reqNumber = req.params.number;
	if(reqSubject != null && reqNumber != null) {
		reqSubject = reqSubject.toUpperCase();
		console.log(reqNumber);
		var promise = coursesCollection.findOne({subject: reqSubject, number: reqNumber}, {fields: {'_id': false}});
		promise.success(function (doc) {
			res.send(doc);
		});
		promise.on('error', function(err){console.log(err)});

	}
});



//routing for providing simple JSON data

//get all courses
router.get('/api/course', function(req, res) {
		var courses = getAllCoursesFromJson();
		res.json(courses);
});


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
	res.status(500).send
	throw error;
});

/* Course critique query routes.*/

//get course info matching this id
router.get('/api/coursecritique/:id', function (req, res) {
	var id = req.params.id;
	if (id != null) {
		id = id.toLowerCase();
		coursecritique.fetchCourse(id).then(function(result) {
			res.send(result);
		});
	}
});



// helper query functions

/**
 * Returns an array of courses
 */
var getAllCoursesFromJson = function() {
	var courses = [];
	for (var course in coursesJson) {
		courses.push(coursesJson[course]);
	}

	return courses;
};



module.exports = router;