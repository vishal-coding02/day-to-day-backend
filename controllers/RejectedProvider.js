const Users = require("../models/UserModel");
const RejectedProvider = require("../models/RejectedProviderModel");

async function rejectedProvider(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    if (req.user.type !== "provider") {
      return res.status(403).json({ message: "Access denied. Provider only." });
    }

    const { id } = req.params;
    const user = await Users.findById(id).populate("userName");

    if (!user) return res.status(404).json({ error: "User not found" });

    const rejectedProviderData = await RejectedProvider.findOne({ userId: id });

    if (!rejectedProviderData) {
      return res.status(404).json({ error: "Provider not found" });
    }

    res.status(200).json({ rejectedData: rejectedProviderData });
  } catch (err) {
    console.error("Error checking provider status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { rejectedProvider };
