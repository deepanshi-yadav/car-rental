const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingsController");
const { verifyToken } = require('../middleware/auth');

router.post("/", verifyToken, bookingController.createBooking);
router.get("/", verifyToken, bookingController.getBookings);
router.delete("/:id", verifyToken, bookingController.deleteBooking);

module.exports = router;

