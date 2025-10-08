const mongoose = require("mongoose");

const ComplaintsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  complaintAgainstID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  userProblem: { type: String, required: true },
  complaintStatus: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    default: "Pending",
  },
  complaintAttachments: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Compalints = mongoose.model("complaint", ComplaintsSchema);

module.exports = Compalints;
