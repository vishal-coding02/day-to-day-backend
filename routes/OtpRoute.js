const express = require("express");
const otpRouter = express.Router();

const { verifyEmail } = require("../libs/Opt");

otpRouter.post("/verifyEmail", verifyEmail);

module.exports = otpRouter;
