const express = require('express');
const router = express.Router();

const { processPayment, FetchPaymentStatus } = require('../controllers/payment-controller.js');

const { payAuthenticate } = require('../middlewares/payment-auth.js');

router.post('/paying', payAuthenticate, processPayment);
router.get('/getPaymentStatus/:orderId', FetchPaymentStatus);

module.exports = router;