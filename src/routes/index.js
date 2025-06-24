const express = require('express');
const router = express.Router();

const { createUser, getUser, getAllUser }  = require('../controllers/user-controller.js');

router.post('/signUp',createUser);

module.exports = router;