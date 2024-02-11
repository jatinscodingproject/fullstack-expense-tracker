const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense')

router.get('/expense',expenseController.getUiPage);

router.get('/expense/data',expenseController.getAllExpenseDetails);

router.post('/expense',expenseController.postExpenseData);

router.get('/expense/delete/:dId',expenseController.deleteUserDetails);

router.get('/expense/edit/:eId',expenseController.editUserDetails)

module.exports = router