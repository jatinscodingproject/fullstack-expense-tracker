const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login');

router.post('/expense/login',loginController.UserExistsInDb);

module.exports = router