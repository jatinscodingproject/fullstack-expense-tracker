const express = require('express');

const router = express.Router();

const purchaseController = require('../controllers/purchase');

const authentication = require('../middleware/user');

router.get('/expense/premiumMembership',authentication.authenticate,purchaseController.purchasePremium);

router.post('/updateTransactionStatus',authentication.authenticate,purchaseController.updateTransactionStatus);

module.exports = router