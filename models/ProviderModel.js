const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  providerIdProf: {
    type: String,
    required: true,
  },
  providerName: {
    type: String,
    required: true,
  },
  providerServicesList: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  providerImageUrl: {
    type: String,
    required: false,
  },
  providerBio: {
    type: String,
    required: false,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  providerTotalJobs: {
    type: Number,
    default: 0,
  },
  providerPricing: {
    type: {
      pricePerHour: { type: Number, required: true },
      workTime: { type: String, required: true },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  providerAvgRating: {
    type: Number,
    default: 0,
  },
});

const Providers = mongoose.model("providers", providerSchema);

module.exports = Providers;
