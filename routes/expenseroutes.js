const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense')

const authentication = require('../middleware/user')

//router.get('/expense',expenseController.getUiPage);

router.post('/expense',expenseController.postExpenseData);

router.get('/expense/data',authentication.authenticate,expenseController.getAllExpenseDetails);

router.get('/expense/delete/:dId',expenseController.deleteUserDetails);

router.get('/expense/edit/:eId',expenseController.editUserDetails)

module.exports = router