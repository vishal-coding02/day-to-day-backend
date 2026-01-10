const Users = require("../models/UserModel");
const CustomerRequests = require("../models/CustomerModel");
const Providers = require("../models/ProviderModel");

async function createCustomerRequest(data, userId) {
  const { name, price, media, serviceType, location, description } = data;

  const user = await Users.findById(userId);
  if (!user) {
    throw new Error("user not found");
  }

  const newRequest = {
    userID: user._id,
    customerName: user.userName || name,
    customerPrice: price,
    customerMedia: media,
    customerServicesList: serviceType,
    customerLocation: location,
    customerDescription: description,
    createdAt: new Date(),
  };

  await CustomerRequests.create(newRequest);

  return { newRequest };
}

async function getMyCustomerRequests(id) {
  const requests = await CustomerRequests.find({
    userID: id,
  }).populate("userID", "userEmail");
  console.log(requests);

  if (!requests || requests.length === 0) {
    throw new Error("No requests found for this customer");
  }

  return { requests };
}

async function findProviders(filters) {
  const { name, serviceType, priceRange } = filters;
  let filter = { status: "approved" };

  if (priceRange && priceRange !== "all") {
    if (priceRange === "inr_low") {
      filter["providerPricing.pricePerHour"] = { $gte: 100, $lte: 200 };
    } else if (priceRange === "inr_mid") {
      filter["providerPricing.pricePerHour"] = { $gte: 200, $lte: 500 };
    } else if (priceRange === "inr_high") {
      filter["providerPricing.pricePerHour"] = { $gte: 500, $lte: 1000 };
    } else if (priceRange === "inr_premium") {
      filter["providerPricing.pricePerHour"] = { $gte: 1000, $lte: 2000 };
    } else if (priceRange === "inr_vip") {
      filter["providerPricing.pricePerHour"] = { $gt: 2000 };
    }
  }

  if (serviceType && serviceType !== "all") {
    filter.providerServicesList = { $in: [serviceType.toLowerCase()] };
  }

  if (name && name.trim() !== "") {
    filter.providerName = { $regex: name, $options: "i" };
  }

  const providers = await Providers.find(filter);

  if (!providers || providers.length === 0) {
    throw new Error("Providers not found");
  }

  return providers;
}

async function customerProfile(id) {
  const customer = await Users.findById(id).populate(
    "providerContactList",
    "userName userPhone profilePic"
  );

  if (!customer) {
    throw new Error("customer not found");
  }

  return { customer };
}

module.exports = {
  createCustomerRequest,
  getMyCustomerRequests,
  findProviders,
  customerProfile,
};
