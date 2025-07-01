const express = require('express');
const router = express.Router();

const { createUser, getUser, getAllUser, signIn }  = require('../controllers/user-controller.js');
const { create, destroy, getAll, getAllExpensesForLeaderboard } = require('../controllers/expense-controller.js');

const { authenticate } = require('../middlewares/auth-middleware.js');

router.get('/getUser', getUser);
router.get('/getAllExpenses', authenticate, getAll);
router.get('/getAllUsers',authenticate, getAllUser);


router.post('/signIn', signIn);
router.post('/signUp',createUser);

router.post('/createExpense', authenticate, create);

router.delete('/deleteExpense/:id', destroy);

module.exports = router;