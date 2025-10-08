const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
});

const Address = mongoose.model("allowedaddress", addressSchema);

module.exports = Address;
