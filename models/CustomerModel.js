// models/CustomerRequestModel.js
const mongoose = require("mongoose");

const customerRequestSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  customerPrice: {
    type: Number,
    required: true,
  },
  customerMedia: {
    type: String,
    required: false,
  },
  customerServicesList: {
    type: [String],
    required: true,
  },
  customerLocation: {
    type: String,
    required: true,
  },
  customerDescription: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomerRequest = mongoose.model(
  "customersRequests",
  customerRequestSchema
);

module.exports = CustomerRequest;
