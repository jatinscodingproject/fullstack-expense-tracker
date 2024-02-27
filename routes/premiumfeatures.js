const express = require('express');

const router = express.Router();

const leaderboard = require('../controllers/preminumfeature');

const authentication = require('../middleware/user')

router.get('/leaderboard',authentication.authenticate,leaderboard.PremiumUser);

router.get('/User/report/download',authentication.authenticate,leaderboard.downloadUserreport);

router.get('/User/report/generation',authentication.authenticate,leaderboard.generateUserReport);

router.get('/User/allfilesDownloaded',authentication.authenticate,leaderboard.getAllDownloadedFiles);

module.exports = router