const express = require('express');
const router = express.Router();
const { createBooking, getBookingsByUser } = require('../controllers/bookingsController');
const { createBookingValidator } = require('../validators/bookingValidator');

router.post('/', createBookingValidator, createBooking);

router.get('/:userId', getBookingsByUser);

module.exports = router;
