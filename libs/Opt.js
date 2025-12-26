const Users = require("../models/UserModel");

const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await Users.findOne({
      verificationCode: otp,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired Code" });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Email Verifed Successfullu" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = { verifyEmail };
