// Verify OTP
const Otp = require("../models/OtpModel");

async function verifyOtp(req, res) {
  try {
    const { otp } = req.body;
    console.log("Received OTP:", otp); // Received OTP check
    console.log("Received OTP Type:", typeof otp); // Type check
    const userOtp = await Otp.findOne({ otp: otp });
    console.log("Database OTP:", userOtp); // Database se mila data
    if (!userOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.log("Error :", err.message);
    return res.status(500).json({ success: false, message: "Server error" }); // Error response add
  }
}

module.exports = { verifyOtp };
