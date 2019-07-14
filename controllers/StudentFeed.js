const mongoose = require('mongoose');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Classroom = require('../models/classroom');
const Marks = require('../models/marks');
const Attendance = require('../models/attendance');
const io = require('../socket');
const jwt = require('jsonwebtoken');


exports.postLoginStudent = (req, res, next) => {

  Student.findOne()
    .where('roll').equals(req.body.roll)
    .exec(function (err, doc) {

      if (err) console.log(err);  

      else {
         console.log(doc.roll + ' Student has been accesssed');
         const token = jwt.sign({doc},'somesupersecretsecret',{expiresIn: '1h'});
        res.status(201).json({
          token : token,
          post: doc
        });
      }

    })
}

exports.postStudentMarks = (req,res,next) => {
    Marks.findById(req.body.markId)
    .select('-_id')
    .select('-studentId')
    .select('-__v')
    .exec(function(err,doc) {
     
      if(err) console.log(err);

      else
      {
         res.status(201).json({
           mark: doc
         });
      }
       
    })
}

exports.postStudentAttendance = (req,res,next) =>{
        Attendance.findOne({studentId:req.body.studentId})
          .select('-_id')
          .select('-studentId')
          .select('-__v')
          .exec(function (err, doc) {

            if (err) console.log(err);

            else {

              console.log(doc);
              res.status(201).json({
                attendance: doc
              });
            }

          })
}



exports.postStudentInfo = (req,res,next) => {
    const doc = req.doc;
  //  console.log(doc);
    res.status(201).json({
       post : doc
    });
}







