const mongoose = require("mongoose");

const rejectedUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  rejectedAt: {
    type: Date,
    default: Date.now,
  },
});

const RejectedProvider = mongoose.model("rejectedProviders", rejectedUserSchema);

module.exports = RejectedProvider;
