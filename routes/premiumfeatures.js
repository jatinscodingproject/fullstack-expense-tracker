const express = require('express');

const router = express.Router();

const leaderboard = require('../controllers/leaderboard');

const authentication = require('../middleware/user')

router.get('/leaderboard',authentication.authenticate,leaderboard.PremiumUser);

module.exports = router