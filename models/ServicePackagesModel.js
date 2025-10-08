const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageTitle: {
      type: String,
      required: true,
      trim: true,
    },
    packageDescription: {
      type: String,
      required: true,
    },
    packagePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    packageTime: {
      type: String,
      required: true,
    },
    packageServicesList: {
      type: [String],
      default: [],
    },
    packagesDeliveryTime: {
      type: String,
      required: true,
    },
    packageStatus: {
      type: Boolean,
      default: true,
    },
    providerName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("packages", packageSchema);

module.exports = Package;
