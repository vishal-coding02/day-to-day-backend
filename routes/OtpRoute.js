const express = require("express");
const otpRouter = express.Router();

const { verifyEmail, generateOTP } = require("../libs/Opt");

otpRouter.post("/verifyEmail", verifyEmail);
otpRouter.post("/send-otp", generateOTP);

module.exports = otpRouter;
