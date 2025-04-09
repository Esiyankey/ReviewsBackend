const { adminSignup, adminLogin } = require('../controller/authController');
const express = require('express');
const router = express.Router();

router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

module.exports = router;


