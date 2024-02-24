const express = require('express');

const router = express.Router();

const passwordResetController= require('../controllers/forgetpassword');

router.get('/forgetPassword/:id',passwordResetController.forgetPassword)

router.post('/password/forgetPasswordlink',passwordResetController.passwordResetLink)

module.exports = router