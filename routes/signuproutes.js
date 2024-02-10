const express = require('express');

const router = express.Router();

const signupController = require('../controllers/signup');

router.get('/expense/signup',signupController.getUserPage);

router.post('/expense/signup',signupController.postUserSignupDetails);

module.exports = router