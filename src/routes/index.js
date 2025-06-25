const express = require('express');
const router = express.Router();

const { createUser, getUser, getAllUser, signIn }  = require('../controllers/user-controller.js');

router.post('/signUp',createUser);

router.get('/getUser', getUser);
router.get('/getAllUsers', getAllUser);
router.post('/signIn', signIn);

module.exports = router;