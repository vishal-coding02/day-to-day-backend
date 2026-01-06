const Providers = require("../models/ProviderModel");
const Users = require("../models/UserModel");
const CustomerRequest = require("../models/CustomerModel");
const CustomerContact = require("../models/CustomerContactModel");
const Coins = require("../models/CoinsModel");
const cloudinary = require("../libs/cloudinary");

async function createProviderProfileService(data) {
  const {
    id,
    name,
    idProf,
    price,
    servicesList,
    image,
    bio,
    totalJobs,
    avgRating,
  } = data;

  const user = await Users.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  let uploadedImage = null;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "providers",
    });
    uploadedImage = uploadResponse.secure_url;
  }

  let uploadedAadhaar = null;
  if (idProf) {
    const aadhaarResponse = await cloudinary.uploader.upload(idProf, {
      folder: "aadhaar",
    });
    uploadedAadhaar = aadhaarResponse.secure_url;
  }

  const newProfile = {
    userID: user._id,
    providerIdProf: uploadedAadhaar,
    providerName: name || user.userName,
    providerServicesList: servicesList.map((s) => s.toLowerCase()),
    providerImageUrl: uploadedImage,
    providerBio: bio,
    providerPricing: {
      pricePerHour: price?.pricePerHour || 0,
      workTime: price?.workTime || "N/A",
    },
    providerTotalJobs: totalJobs,
    providerAvgRating: avgRating,
    status: "pending",
    createdAt: new Date(),
  };

  await Providers.create(newProfile);
  return true;
}

async function fetchProviderProfile(id) {
  const provider = await Providers.findOne({
    userID: id,
  }).populate("userID", "userName userAddress userPhone");

  if (!provider) {
    throw new Error("Provider not found");
  }
  return { provider };
}

async function checkProviderUnderReviewStatus(userId) {
  const user = await Users.findById(userId);
  const provider = await Providers.findOne({ userID: userId });

  if (!user || !provider) {
    throw new Error("User/Provider not found");
  }

  if (provider.status === "pending") {
    return { provider };
  }
}

const fetchProviderDashboardData = async () => {
  const customersRequests = await CustomerRequest.find({});
  return customersRequests;
};

const unlockCustomerContactService = async ({
  providerId,
  customerId,
  deductCoins,
}) => {
  const userCoins = await Coins.findOne({ userID: providerId });

  if (!userCoins || userCoins.addCoins < deductCoins) {
    throw new Error("Not enough coins");
  }

  userCoins.addCoins -= deductCoins;
  await userCoins.save();

  const provider = await Providers.findOne({ userID: providerId });
  if (!provider) {
    throw new Error("Provider not found");
  }

  const customer = await Users.findById(customerId);
  if (!customer) {
    throw new Error("Customer not found");
  }

  const newContact = await CustomerContact.create({
    userID: customerId,
    providerName: provider.providerName,
    customerNumber: customer.userPhone,
  });

  return {
    updatedCoins: userCoins.addCoins,
    customerContact: newContact.customerNumber,
  };
};

module.exports = {
  createProviderProfileService,
  fetchProviderProfile,
  fetchProviderDashboardData,
  checkProviderUnderReviewStatus,
  unlockCustomerContactService,
};
