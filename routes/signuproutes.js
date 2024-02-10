const express = require('express');

const router = express.Router();

const signupController = require('../controllers/signup');

router.get('/expense/signup/data/exists',signupController.haveUser)

router.post('/expense/signup',signupController.postUserSignupDetails);

module.exports = router