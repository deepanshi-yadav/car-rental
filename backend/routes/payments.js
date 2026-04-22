const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');
const { verifyToken } = require('../middleware/auth');

// POST /api/payments - process payment for booking
router.post('/', verifyToken, paymentsController.processPayment);

module.exports = router;

