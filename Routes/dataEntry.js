const express = require('express');
const DataEntryController = require('../controllers/dataEntry');
const router = express.Router();

router.get('/studentRegister',DataEntryController.getStudentRegister);

router.get('/teacherRegister',DataEntryController.getTeacherRegister);

router.post('/studentRegistered',DataEntryController.postStudentRegister);

router.post('/teacherRegistered',DataEntryController.postTeacherRegister);

module.exports = router;