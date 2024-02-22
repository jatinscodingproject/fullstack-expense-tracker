const express = require('express');

const router = express.Router();

const passwordResetController= require('../controllers/forgetpassword');

router.post('/password/forgetPassword',passwordResetController.passwordResetLink)

module.exports = router