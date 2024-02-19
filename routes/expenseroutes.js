const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense')

const authentication = require('../middleware/user')

//router.get('/expense',expenseController.getUiPage);

router.post('/expense',authentication.authenticate,expenseController.postExpenseData);

router.get('/expense/data',authentication.authenticate,expenseController.getAllExpenseDetails);

router.get('/expense/delete/:dId',authentication.authenticate,expenseController.deleteUserDetails);

router.get('/expense/edit/:eId',authentication.authenticate,expenseController.editUserDetails)

module.exports = router