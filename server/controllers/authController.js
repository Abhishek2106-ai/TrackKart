const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const { sendOtpEmail } = sendEmail;

const blockedDomains = [
  "tempmail.com",
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "yopmail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "dispostable.com",
  "maildrop.cc",
  "sharklasers.com",
];

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Step 1: Register -> validates input, creates an UNVERIFIED user row, sends OTP
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const domain = normalizedEmail.split("@")[1];

    if (!domain || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    if (blockedDomains.includes(domain)) {
      return res.status(400).json({
        message: "Temporary email addresses are not allowed.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    if (existingUser && existingUser.is_verified) {
      return res.status(400).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

    if (existingUser && !existingUser.is_verified) {
      // Previously started but never verified — overwrite with fresh details/OTP
      await supabase
        .from("users")
        .update({
          name,
          password: hashedPassword,
          otp_code: otp,
          otp_expires_at: otpExpiresAt,
        })
        .eq("id", existingUser.id);
    } else {
      const { error } = await supabase.from("users").insert([
        {
          name,
          email: normalizedEmail,
          password: hashedPassword,
          is_verified: false,
          otp_code: otp,
          otp_expires_at: otpExpiresAt,
        },
      ]);

      if (error) {
        return res.status(500).json(error);
      }
    }

    try {
      await sendOtpEmail(normalizedEmail, name, otp);
    } catch (emailErr) {
      console.error("Failed to send OTP email:", emailErr.message);
      return res.status(500).json({
        message: "Couldn't send verification email. Please try again.",
      });
    }

    res.json({
      message: "Verification code sent to your email.",
      email: normalizedEmail,
      requiresOtp: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Step 2: Verify OTP -> confirms the code and activates the account
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and code are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    if (!user) {
      return res.status(404).json({
        message: "No pending registration found for this email.",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        message: "This account is already verified. Please login.",
      });
    }

    if (!user.otp_code || user.otp_code !== String(otp)) {
      return res.status(400).json({
        message: "Incorrect verification code.",
      });
    }

    if (!user.otp_expires_at || new Date(user.otp_expires_at) < new Date()) {
      return res.status(400).json({
        message: "This code has expired. Please request a new one.",
      });
    }

    await supabase
      .from("users")
      .update({
        is_verified: true,
        otp_code: null,
        otp_expires_at: null,
      })
      .eq("id", user.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: !!user.is_admin,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Resend a fresh OTP for an unverified account
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    if (!user) {
      return res.status(404).json({
        message: "No pending registration found for this email.",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        message: "This account is already verified. Please login.",
      });
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

    await supabase
      .from("users")
      .update({ otp_code: otp, otp_expires_at: otpExpiresAt })
      .eq("id", user.id);

    await sendOtpEmail(normalizedEmail, user.name, otp);

    res.json({ message: "A new verification code has been sent." });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        requiresOtp: true,
        email: user.email,
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: !!user.is_admin,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
};