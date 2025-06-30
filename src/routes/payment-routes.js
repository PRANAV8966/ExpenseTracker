const express = require('express');
const router = express.Router();

const { processPayment, FetchPaymentStatus } = require('../controllers/payment-controller.js');

router.post('/paying', processPayment);
router.get('/getPaymentStatus/:orderId', FetchPaymentStatus);

module.exports = router;