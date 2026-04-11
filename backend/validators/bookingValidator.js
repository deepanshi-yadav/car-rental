const { body, validationResult } = require('express-validator');

exports.createBookingValidator = [
  body('userId').isMongoId().withMessage('Valid user ID required'),
  body('vehicleId').isMongoId().withMessage('Valid vehicle ID required'),
  body('startDate').isISO8601().withMessage('Valid start date required'),
  body('endDate').isISO8601().withMessage('Valid end date required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

