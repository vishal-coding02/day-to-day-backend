const mongoose = require("mongoose");

const customerContactSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  providerName: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: String,
    required: true,
  },
});

const CustomerContact = mongoose.model(
  "customerContact",
  customerContactSchema
);
module.exports = CustomerContact;
