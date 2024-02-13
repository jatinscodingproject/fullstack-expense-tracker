const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login');

router.get('/expense/login/page',loginController.getUserLoginPage)

router.post('/expense/login',loginController.UserExistsInDb);

// router.get('/expense',loginController.getUiPage);

module.exports = router