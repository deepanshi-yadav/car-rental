const Booking = require('../models/booking');
const { sendNotification } = require('../utils/notifications');

// Demo mock payment (SRS "demo mode")
exports.processPayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;


    const booking = await Booking.findOne({ _id: bookingId, userId: req.user.id });

    if (!booking || booking.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid booking for payment' });
    }

    // Mock Stripe success
    const mockPaymentId = `pi_demo_${Date.now()}`;

    // Update booking
    booking.status = 'paid';
    booking.paymentId = mockPaymentId;
    await booking.save();

    // Notification
    sendNotification('payment', `Payment successful for booking ${bookingId}. Amount: $${amount} (demo)`, req.user.email || 'user@example.com');

    res.status(200).json({ message: 'Payment successful (demo)', paymentId: mockPaymentId, booking });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

