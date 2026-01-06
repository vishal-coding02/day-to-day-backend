const {
  createProviderProfileService,
  fetchProviderProfile,
  checkProviderUnderReviewStatus,
  fetchProviderDashboardData,
  unlockCustomerContactService,
} = require("../services/provider.service");

async function createProviderProfile(req, res) {
  try {
    await createProviderProfileService(req.body);
    return res
      .status(201)
      .json({ message: "provider profile created successfully." });
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
}

async function getProviderProfile(req, res) {
  try {
    if (req.user.type === "provider" || req.user.type === "customer") {
      const { id } = req.params;
      const { provider } = await fetchProviderProfile(id);
      return res.status(200).json({ providerData: provider });
    } else {
      return res.status(403).json({
        error:
          "Access denied. Only provider & customers can view this profile.",
      });
    }
  } catch (err) {
    if (err.message === "Provider not found") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
}

const getProviderDashBoard = async (req, res) => {
  if (req.user.type !== "provider") {
    return res.status(403).json({ message: "Access denied. Provider only." });
  }

  try {
    const requests = await fetchProviderDashboardData();

    if (!requests || requests.length === 0) {
      return res.status(404).json({ error: "Customer requests not found" });
    }

    return res.status(200).json({ requests });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const providerUnderReviewController = async (req, res) => {
  if (req.user.type !== "provider") {
    return res.status(403).json({ message: "Access denied. Provider only." });
  }

  try {
    const { provider } = await checkProviderUnderReviewStatus(req.params.id);
    return res.status(200).json({
      userName: provider.providerName,
      message:
        "Your account has been submitted for review. Our team is currently verifying your details and documents to ensure everything meets our guidelines. During this review period, you won’t be able to access the provider dashboard or offer services. Once your account is approved, you will receive a confirmation email and then you can log in normally. Thank you for your patience and cooperation.",
    });
  } catch (err) {
    if (err.message === "User/Provider not found") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

const unlockCustomerContact = async (req, res) => {
  if (req.user.type !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Only providers can unlock customer contact",
    });
  }

  try {
    const result = await unlockCustomerContactService({
      providerId: req.user.id,
      customerId: req.body.id,
      deductCoins: req.body.deductCoins,
    });

    return res.status(200).json({
      success: true,
      message: `${req.body.deductCoins} coins deducted successfully`,
      updatedCoins: result.updatedCoins,
      customerContact: result.customerContact,
    });
  } catch (err) {
    if (err.message === "Not enough coins") {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createProviderProfile,
  getProviderProfile,
  getProviderDashBoard,
  providerUnderReviewController,
  unlockCustomerContact,
};
