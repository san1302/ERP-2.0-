const express = require('express');
const StudentfeedController = require('../controllers/StudentFeed');
const TeacherfeedController = require('../controllers/TeacherFeed');
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

// GET => /feed/posts
router.post('/student/mark',StudentfeedController.postStudentMarks);
router.post('/student/attendance',StudentfeedController.postStudentAttendance)
router.post('/StudentInfo',isAuth,StudentfeedController.postStudentInfo);
router.post('/TeacherInfo', isAuth, TeacherfeedController.postTeacherInfo);

// STUDENT AUTH ROUTE
router.post('/loginStudent',StudentfeedController.postLoginStudent);


// for teacher
router.post('/checkTeacher',TeacherfeedController.postCheckTeacher);
router.post('/getStudentsListFromClassroom',TeacherfeedController.postGetStudentsList)
router.post('/getClassroomMarksTableData',TeacherfeedController.postGetClassroomMarksTableData)
router.post('/getClassroomAttendanceTableData', TeacherfeedController.postGetClassroomAttendanceTableData)

router.post('/postUpdateMarksTable',TeacherfeedController.postUpdateMarksTable);
router.post('/postUpdateAttendanceTable', TeacherfeedController.postUpdateAttendanceTable);

module.exports = router;