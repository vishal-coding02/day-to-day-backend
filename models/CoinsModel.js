const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
    name: {
      type: String, 
      required: true,
    },
    phone: {
      type: String, 
      required: true,
    },
    packageID: {
      type: String, 
      required: true,
    },
    packageName: {
      type: String, 
      required: true,
    },
    addCoins: {
      type: Number, 
      required: true,
    },
    addPrice: {
      type: Number, 
      required: true,
    },
    paymentMethod: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success", 
    },
  },
  { timestamps: true }
);

const Coins = mongoose.model("coins", coinSchema);

module.exports = Coins;
