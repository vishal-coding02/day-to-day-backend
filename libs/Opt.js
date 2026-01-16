const Users = require("../models/UserModel");
const { sendResetPassOtpEmail } = require("../utils/email/sendEmail");
const OTP_EXPIRY_MINUTES = 10;

const verifyEmail = async (req, res) => {
  try {
    const { otp, purpose } = req.body;

    const user = await Users.findOne({
      verificationCode: otp,
      otpPurpose: purpose,
      otpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired OTP" });
    }

    if (purpose === "EMAIL_VERIFY") {
      user.isVerified = true;
    }

    if (purpose === "PASSWORD_RESET") {
      user.resetPasswordAllowed = true;
    }

    user.verificationCode = undefined;
    user.otpExpiry = undefined;
    user.otpPurpose = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const generateOTP = async (req, res) => {
  try {
    const { id, purpose } = req.body;

    const user = await Users.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + OTP_EXPIRY_MINUTES);

    user.verificationCode = verificationCode;
    user.otpExpiry = expiryTime;
    user.otpPurpose = purpose;
    user.resetPasswordAllowed = false;

    await user.save();

    await sendResetPassOtpEmail({
      toEmail: user.userEmail,
      userName: user.userName,
      verificationCode,
      expiryTime,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      expiry: OTP_EXPIRY_MINUTES * 60,
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to generate OTP" });
  }
};

module.exports = { verifyEmail, generateOTP };
