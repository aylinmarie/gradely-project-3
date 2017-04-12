var express = require('express');
var router = express.Router({ mergeParams: true });
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var Student = require('../models/student');
var Assignment = require('../models/assignment');
var logger = require('morgan');
var User = require('../models/user');
var clone = require('lodash/clone');


//======================
// ADD STUDENT
//======================

// POST /api/users/:userId/students
router.post('/', function createAction(request, response) {
  // var id = request.params.id;
  var userId = request.params.userId;
  console.log(userId);

  var newStudent = new Student({
    firstName   : request.body.firstName,
    lastName    : request.body.lastName,
    assignments : []
  });

  User
    .findById(userId)
    .exec(function whatever(err, user) {
      // If there's at least one student
      if (user.students.length > 0) {
        // Grab the first student
        var firstStudent = user.students[0];

        // Loop over their assignments
        firstStudent.assignments.forEach(function pushAssignment(assignment) {
          // Push each assignment with a score of 0 to newStudent's assignments arr
          var clonedAssignment = clone(assignment);
          clonedAssignment.pointsEarned = 0;
          newStudent.assignments.push(clonedAssignment);
        })
      }

      // Push this new student into their .students array
      user.students.push(newStudent);
      // save that user
      user.save();

      // return { student: student }
      response.send({ student: newStudent });
    });
  });

module.exports = router;
