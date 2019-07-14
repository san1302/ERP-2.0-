const express = require('express');
const HomeController = require('../controllers/home');
const router = express.Router();


router.get('/',HomeController.getIndex);

module.exports = router;