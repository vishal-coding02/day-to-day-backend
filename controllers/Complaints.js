const Users = require("../models/UserModel");
const Compalints = require("../models/ComplaintModel");

async function usersComplaints(req, res) {
  try {
    const user = await Users.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "user not found" });

    const newComplaint = {
      userID: user._id,
      complaintAgainstID: req.body.againstID,
      userProblem: req.body.problem,
      complaintStatus: req.body.status || "Pending",
      complaintAttachments: req.body.image,
    };

    await Compalints.create(newComplaint);

    console.log("Complaint sent...");
    res.status(201).json({
      message: "Complaint sent successfully...",
    });
  } catch (err) {
    console.log("Complsints Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { usersComplaints };
