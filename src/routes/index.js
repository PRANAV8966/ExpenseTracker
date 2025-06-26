const express = require('express');
const router = express.Router();

const { createUser, getUser, getAllUser, signIn }  = require('../controllers/user-controller.js');
const { create, destroy, getAll } = require('../controllers/expense-controller.js');

router.post('/signUp',createUser);

router.get('/getUser', getUser);
router.get('/getAllUsers', getAllUser);

router.get('/getAllExpenses', getAll);

router.post('/signIn', signIn);

router.post('/createExpense', create);

router.delete('/deleteExpense/:id', destroy);

module.exports = router;