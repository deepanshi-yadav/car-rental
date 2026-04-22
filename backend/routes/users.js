const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// GET all users
router.get("/", verifyToken, isAdmin, userController.getUsers);

// CREATE user
//outer.post("/login", userController.createUser);

// signup route
// SIGNUP ROUTE
router.post("/", userController.createUser);

// LOGIN route
router.post("/login", userController.loginUser);

// GET single user
router.get("/:id", verifyToken, isAdmin, userController.getUserById);

// UPDATE user
router.put("/:id", verifyToken, isAdmin, userController.updateUser);

// DELETE user
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;