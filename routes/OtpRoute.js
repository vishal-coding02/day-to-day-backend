const express = require("express");
const otpRouter = express.Router();

const {  verifyOtp } = require("../controllers/Otp");

otpRouter.post("/verifyOtp", verifyOtp);


module.exports = otpRouter;
