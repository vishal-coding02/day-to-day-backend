const mongoose = require("mongoose");

const optSchema = new mongoose.Schema({
  otp: { type: String, required: true },
});

const Otp = mongoose.model("otpverifications", optSchema);

module.exports = Otp;
