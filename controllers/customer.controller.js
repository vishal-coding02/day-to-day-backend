const {
  createCustomerRequest,
  getMyCustomerRequests,
  findProviders,
  customerProfile,
} = require("../services/customer.service");

async function createCustomerRequestController(req, res) {
  if (req.user.type !== "customer") {
    return res
      .status(403)
      .json({ error: "Only customers can create a request" });
  }
  try {
    const { newRequest } = await createCustomerRequest(req.body, req.user.id);
    return res
      .status(201)
      .json({ message: "Request created successfully", data: newRequest });
  } catch (err) {
    if (err.message === "user not found") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
}

async function getMyCustomerRequestsController(req, res) {
  if (req.user.type !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Only customers can see their requests",
    });
  }
  try {
    const { requests } = await getMyCustomerRequests(req.user.id);
    return res.status(200).json({
      message: "My Requests fetched successfully",
      data: requests,
    });
  } catch (err) {
    if (err.message === "No requests found for this customer")
      res.status(404).json({ error: err.message });
  }
  return res.status(500).json({ success: false, message: err.message });
}

async function searchProvidersController(req, res) {
  if (req.user.type !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Only customers can find providers",
    });
  }
  try {
    const { providers } = await findProviders(req.query);
    res.status(200).json({
      success: true,
      message: "Providers fetched successfully",
      data: providers,
    });
  } catch (err) {
    if (err.message === "Providers not found") {
      return res.status(404).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

async function customerProfileController(req, res) {
  if (req.user.type !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Only customers fetch there profile",
    });
  }

  try {
    const { id } = req.params;
    const { customer } = await customerProfile(id);

    res.status(200).json({
      message: "customer profile fetched successfully",
      data: customer,
    });
  } catch (err) {
    if (err.message === "customer not found") {
      return res.status(404).json({ success: false, error: err.message });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createCustomerRequestController,
  getMyCustomerRequestsController,
  searchProvidersController,
  customerProfileController,
};
