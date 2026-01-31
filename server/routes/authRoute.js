const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

// ✅ PASS FUNCTION REFERENCE (NO parentheses)
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
