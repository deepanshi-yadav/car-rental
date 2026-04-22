const express = require('express');
const router = express.Router();
const plansController = require('../controllers/plansController');

// GET /api/plans
router.get('/', plansController.getPlans);

module.exports = router;
