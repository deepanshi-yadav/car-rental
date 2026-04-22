const express = require("express");
const router = express.Router();

const vehiclesController = require("../controllers/vehiclesController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// GET all available vehicles
router.get("/", vehiclesController.getVehicles);

// CREATE vehicle (admin)
router.post("/", verifyToken, isAdmin, vehiclesController.createVehicle);

// UPDATE vehicle availability
router.patch("/availability", verifyToken, isAdmin, vehiclesController.updateVehicleAvailability);

module.exports = router;
