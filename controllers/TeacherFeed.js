const mongoose = require('mongoose');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Classroom = require('../models/classroom');
const Marks = require('../models/marks');
const Attendance = require('../models/attendance');
const jwt = require('jsonwebtoken');
const io = require('../socket');

exports.postCheckTeacher = (req,res,next) => {
     Teacher.findOne()
     .where('roll').equals(req.body.roll)
     .exec(function (err, doc) {

       if (err){
            console.log(err);
       }

       if(!doc)
       {
         res.status(200).json({
              message : 'No Teacher with such credentials found'
            })
       }

       else {
         const token = jwt.sign({doc},'somesupersecretsecret',{expiresIn: '1h'});
         res.status(201).json({
           token : token,
           post: doc
         });
       }

     })
}

exports.postGetStudentsList = (req,res,next) => {

      let teacherid = req.body.teacherid;
      let branch = req.body.branch;
      let semester = req.body.semester;

      Classroom.findOne({teacherid: teacherid})
      .where('branch').equals(branch)
      .where('semester').equals(semester)
      .exec(function (err, doc) {

       if (err){
            console.log(err);
       }

       if(!doc)
       {
         res.status(200).json({
              message : 'No Such classroom found!'
            })
       }

       else {
         res.status(201).json({
           post: doc
         });
       }

     })

}


exports.postGetClassroomMarksTableData = (req,res,next) => {
    let  classroomId = req.body.classroomId;
   // let post = [];
    Classroom.findOne({_id:classroomId})
    .populate('studentId')
    .exec(function(err,doc){
          if(err)
          console.log(err);
          
            if (!doc) {
             res.status(200).json({
               message: 'No Such classroom found!'
             })
           }  else {
            
              Marks.find({
                 'studentId':{$in :doc.studentId}
               })
               .populate('studentId')
               .exec(function (err,docs) {
                  const post = docs.map(doc =>{
                      return({roll:doc.studentId.roll,markSubject : doc.Marks})
                  })
                  res.status(201).json({
                     post : post
                  })
               })
               
              
            } 
    
    })
} 

exports.postUpdateMarksTable = (req,res,next) => {
    let data = req.body.post;
    data.map(details => {
      Student.findOne({roll :details.roll})
      .exec(function (err,student) {
           if(err)
           console.log(err);

           else
           {
               Marks.findOne()
                 .where('studentId').equals(student._id)
                 .exec(function (err, doc) {
                   if (err)
                     console.log(err);

                   else {
                     doc.Marks = details.markSubject
                     console.log(doc.Marks)
                     doc.save();
                   }
                 })
           }
      })
         
    })
}


exports.postGetClassroomAttendanceTableData = (req, res, next) => {
  let classroomId = req.body.classroomId;
  // let post = [];
  Classroom.findOne({
      _id: classroomId
    })
    .populate('studentId')
    .exec(function (err, doc) {
      if (err)
        console.log(err);

      if (!doc) {
        res.status(200).json({
          message: 'No Such classroom found!'
        })
      } else {

        Attendance.find({
            'studentId': {
              $in: doc.studentId
            }
          })
          .populate('studentId')
          .exec(function (err, docs) {
             
             if(err)
             console.log(err);

            const post = docs.map(doc => {
              return ({
                roll: doc.studentId.roll,
                presentORabsent : 'absent'
              })
            })

            //console.log(post)
            res.status(201).json({
              post: post
            })
          })


      }

    })
}


exports.postUpdateAttendanceTable = (req,res,next) => {
     let data = req.body.post;
     let subject = req.body.subject;

     data.map(details => {
       Student.findOne({
           roll: details.roll
         })
         .exec(function (err, student) {
           if (err)
             console.log(err);

           else {
             Attendance.findOne()
               .where('studentId').equals(student._id)
               .exec(function (err, doc) {
                 if (err)
                   console.log(err);

                 else {
                        let attendanceList = [...doc.Attendances];
                       let newAttendanceList = attendanceList.map(SubjectAttendance => {
                             if(SubjectAttendance.subject === subject)
                             {
                                SubjectAttendance.totalClasses += 1;
                                if(details.presentORabsent === "present")
                                 SubjectAttendance.classesPresent += 1;

                                if(SubjectAttendance.totalClasses !== 0)
                                {
                                   SubjectAttendance.attendance = (SubjectAttendance.classesPresent/SubjectAttendance.totalClasses)*100;
                                   //console.log("hey man")
                                }
                             }

                             return SubjectAttendance;

                        })

                        doc.Attendance = newAttendanceList;
                  /*  doc.Marks = details.markSubject
                   console.log(doc.Marks) */
                   doc.save();
                 }
               })
           }
         })

     })
}

exports.postTeacherInfo = (req, res, next) => {
  const doc = req.doc;
  //  console.log(doc);
  res.status(201).json({
    post: doc
  });
}