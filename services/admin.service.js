const Users = require("../models/UserModel");
const Providers = require("../models/ProviderModel");
const {
  sendApprovalEmail,
  sendRejectionEmail,
} = require("../utils/email/sendEmail");
const RejectedProvider = require("../models/RejectedProviderModel");

async function getAllUsersController() {
  const users = await Users.find({});

  if (users.length <= 0) {
    throw new Error("users not found");
  }

  return { users };
}

async function fetchPendingProviders() {
  const providers = await Providers.find({ status: "pending" });

  if (providers.length > 0) {
    return { providers };
  } else {
    throw new Error("pending providers not found");
  }
}

async function fetchProviderProfileForReview(userId) {
  const user = await Users.findById(userId);
  const provider = await Providers.findOne({ userID: userId });

  if (!user && !provider) {
    throw new Error("User/Provider not found");
  }

  return { user, provider };
}

async function sendProviderApprovalEmail({ userId, providerId }) {
  const provider = await Providers.findByIdAndUpdate(
    providerId,
    { status: "approved" },
    { new: true }
  );

  if (!provider) {
    throw new Error("PROVIDER_NOT_FOUND");
  }

  const user = await Users.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await sendApprovalEmail(user.userEmail, user.userName);

  return { provider, user };
}

async function sendProviderRejectionEmail(data) {
  const { providerId, userId, reason } = data;

  const user = await Users.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const provider = await Providers.findByIdAndUpdate(
    providerId,
    { status: "reject" },
    { new: true }
  );

  if (!provider) {
    throw new Error("Provider not found");
  }

  const rejectedDoc = await RejectedProvider.create({
    userId: user._id,
    reason: reason || "Not specified",
    rejectedAt: new Date(),
  });

  await sendRejectionEmail(user.userEmail, user.userName, reason);

  console.log("rejected provider", RejectedProvider);
  return { rejectedDoc };
}

module.exports = {
  getAllUsersController,
  fetchPendingProviders,
  fetchProviderProfileForReview,
  sendProviderApprovalEmail,
  sendProviderRejectionEmail,
};
