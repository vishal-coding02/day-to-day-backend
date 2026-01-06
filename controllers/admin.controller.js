const {
  getAllUsersController,
  fetchPendingProviders,
  fetchProviderProfileForReview,
  sendProviderRejectionEmail,
  sendProviderApprovalEmail,
} = require("../services/admin.service");

async function fetchAllUsers(req, res) {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  try {
    const { users } = await getAllUsersController();

    return res.status(200).json({ allUsers: users });
  } catch (err) {
    if (err.message === "users not found") {
      return res.status(404).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function getPendingProvidersController(req, res) {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  try {
    const { providers } = await fetchPendingProviders();

    return res.status(200).json({ allProviders: providers });
  } catch (err) {
    if (err.message === "pending providers not found") {
      return res.status(404).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function reviewProviderProfileController(req, res) {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  try {
    const { user, provider } = await fetchProviderProfileForReview(
      req.params.id
    );

    res.status(200).json({
      userData: user || null,
      providerData: provider || null,
    });
  } catch (err) {
    if (err.message === "User/Provider not found") {
      return res.status(404).json({ success: false, message: err.message });
    }

    return res.status(500).json({ success: false, error: err.message });
  }
}

async function sendProviderApprovalMailController(req, res) {
  try {
    if (req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { providerId, userId } = req.body;

    const result = await sendProviderApprovalEmail({
      providerId,
      userId,
    });

    res.json({
      message: "Provider approved and email sent",
      provider: result.provider,
      user: result.user,
    });
  } catch (err) {
    console.error("Approval error:", err.message);

    if (err.message === "PROVIDER_NOT_FOUND") {
      return res.status(404).json({ error: "Provider not found" });
    }

    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}

async function sendProviderRejectionMailController(req, res) {
  if (req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  try {
    const result = await sendProviderRejectionEmail(req.body);

    return res.status(201).json({
      message: "Provider rejected, record saved and email sent",
      data: result,
    });
  } catch (err) {
    if (
      err.message === "Provider not found" ||
      err.message === "User not found"
    ) {
      return res.status(404).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  fetchAllUsers,
  getPendingProvidersController,
  reviewProviderProfileController,
  sendProviderApprovalMailController,
  sendProviderRejectionMailController,
};
