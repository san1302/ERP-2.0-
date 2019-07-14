const mongoose = require('mongoose');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Classroom = require('../models/classroom');
const Marks = require('../models/marks');
const Attendance = require('../models/attendance');

exports.getStudentRegister = (req,res,next) => {
       res.render('auth/studentRegister',{
           PageTitle: 'StudentRegister'
       });
};

exports.getTeacherRegister = (req, res, next) => {
    res.render('auth/teacherRegister', {
        PageTitle : 'TeacherRegister'
    });
};




exports.postStudentRegister = (req,res,next) => {
            const roll = req.body.roll;
            const password = req.body.password;
            const name = req.body.name;
            const email = req.body.email;
            const branch = req.body.branch;
            const semester = req.body.semester;

            
        //marks
            const student = new Student({
                roll:roll,
                password:password,
                name:name,
                email:email,
                branch:branch,
                semester:semester
            })
            
            student.save( function(err) {
                if (err) console.log(err);
                const mark = new Marks({
                    studentId : student._id
                }
                );

                mark.Marks.push({subject:"dbms",mark:0});
                mark.Marks.push({subject:"os",mark:0});
                mark.save();

             
                 const attendance = new Attendance({
                      studentId: student._id
                 });
                 
                 attendance.Attendances.push({subject:"dbms",attendance:0,totalClasses:0,classesPresent:0});
                 attendance.Attendances.push({subject:"os",attendance:0,totalClasses:0,classesPresent:0});
                
                 attendance.save();

                student.markId = mark._id;
                
              
                Classroom.findOne()
                .where('branch').equals(branch)
                .where('semester').equals(semester)
                .exec(function(err,doc){

                    if(err) console.log(err);

                    else
                    {
                          if (!doc) {
                               doc = new Classroom({
                                  branch: branch,
                                  semester: semester,
                              });
               
                              doc.studentId.push(student);
                                student.classroomId = doc._id; // abhi yaha classrooid nhi enter ho rhi..
                                console.log(student.classroomId)
                              doc.save(function (err) {
                                  if (err) console.log(err);
                              });
                          } 
                          
                          else {
                              doc.studentId.push(student);
                              doc.save();
                          }

                          
                    }
                   
                  
                });

                student.save(function(err) {
                    if (err) console.log(err)
                })
                
                res.redirect('/');
            })
     
      
};


exports.postTeacherRegister = (req,res,next) => {
           const roll = req.body.roll;
           const password = req.body.password;
           const name = req.body.name;
           const email = req.body.email;
           const branch = req.body.branch;
           const semester = req.body.semester;
           const subject = req.body.subject;

           //marks
           const teacher = new Teacher({
               roll: roll,
               password: password,
               name: name,
               email: email,
               branch: branch,
               semester: semester
           });


            teacher.save( function(err) {
                if (err) console.log(err);
                
                Classroom.findOne()
                .where('branch').equals(branch)
                .where('semester').equals(semester)
                .exec(function(err,doc){

                    if(err) console.log(err);

                    else
                    {
                          if (!doc) {
                              console.log('No such classroom exist as no student has been enrolled in this classroom')
                          } 
                          
                          else {
                              doc.teacherId.push(teacher);
                              doc.subjects.push(subject);
                              doc.save();
                              teacher.classroomId = doc._id
                          }

                         
                    }
                   
                   ; // abhi yaha classrooid nhi enter ho rhi..
                });

                teacher.save(function(err) {
                    if (err) console.log(err)
                })
                
                res.redirect('/');
            })


};