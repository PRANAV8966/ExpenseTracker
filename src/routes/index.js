const express = require('express');
const router = express.Router();

const { createUser, getUser, getAllUser, getUserByEmail }  = require('../controllers/user-controller.js');

router.post('/signUp',createUser);

router.get('/getUser', getUser);
router.get('/getAllUsers', getAllUser);
router.post('/getUserByEmail', getUserByEmail);

module.exports = router;