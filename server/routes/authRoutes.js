const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", loginUser);

module.exports = router;
