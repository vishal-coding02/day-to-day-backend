const Providers = require("../models/ProviderModel");
const Users = require("../models/UserModel");
const CustomerRequest = require("../models/CustomerModel");
const CustomerContact = require("../models/CustomerContactModel");
const Coins = require("../models/CoinsModel");
const cloudinary = require("../libs/cloudinary");

async function profiderProfileCreation(req, res) {
  try {
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
    } = req.body;

    const user = await Users.findById(id);
    if (!user) return res.status(400).json({ error: "user not found" });

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
    console.log("provider profile created");
    res.status(201).json({ message: "provider profile created successfully." });
  } catch (err) {
    console.log("Provider Profile Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function providerProfile(req, res) {
  if (req.user.type === "provider" || req.user.type === "customer") {
    try {
      const provider = await Providers.findOne({
        userID: req.params.id,
      }).populate("userID", "userName userAddress userPhone");

      if (!provider) {
        return res.status(404).json({ error: "Provider not found" });
      } else {
        res.status(200).json({ providerData: provider });
      }
    } catch (err) {
      console.log("Provider Profile Error :", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res
      .status(403)
      .json({ error: "Access denied. Only providers can view this profile." });
  }
}

async function providerDashBoard(req, res) {
  try {
    if (req.user.type === "provider") {
      const customersRequests = await CustomerRequest.find({});

      if (customersRequests.length > 0) {
        res.status(200).json({ requests: customersRequests });
      } else {
        res.status(404).json({ error: "Customers Requests not found" });
      }
    } else {
      res.status(403).json({ message: "Access denied. Provider only." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function providerUnderReview(req, res) {
  try {
    if (req.user.type === "provider") {
      const user = await Users.findById(req.params.id);
      const provider = await Providers.findOne({ userID: req.params.id });

      if (!user || !provider) {
        return res.status(404).json({ error: "User/Provider not found" });
      }

      if (provider.status === "pending") {
        return res.status(200).json({
          userName: provider.providerName,
          message:
            "Your account has been submitted for review. Our team is currently verifying your details and documents to ensure everything meets our guidelines. During this review period, you won’t be able to access the provider dashboard or offer services. Once your account is approved, you will receive a confirmation email and then you can log in normally. Thank you for your patience and cooperation.",
        });
      }
    } else {
      return res.status(403).json({ message: "Access denied. Provider only." });
    }
  } catch (err) {
    console.error("Error checking provider status:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const buyCustomerContact = async (req, res) => {
  try {
    if (!(req.user.type === "provider")) {
      return res.status(403).json({
        success: false,
        message: "Only providers can deduct coins",
      });
    }

    const { deductCoins, id } = req.body;

    const userCoins = await Coins.findOne({ userID: req.user.id });
    if (!userCoins || userCoins.addCoins < deductCoins) {
      return res.status(400).json({
        success: false,
        message: "Not enough coins",
      });
    }

    console.log("STEP 1: Starting coin deduction");

    userCoins.addCoins -= deductCoins;
    await userCoins.save();
    console.log("STEP 2: Coins deducted successfully");

    const provider = await Providers.findOne({ userID: req.user.id });
    console.log("STEP 3: Provider found", provider?.userID);

    const customer = await Users.findById(id);
    console.log("STEP 4: Customer found", customer?._id);

    const newContact = {
      userID: id,
      providerName: provider?.providerName,
      customerNumber: customer?.userPhone,
    };

    console.log("STEP 5: Creating customer contact", newContact);

    await CustomerContact.create(newContact);
    console.log("STEP 6: Contact created successfully");

    res.status(200).json({
      success: true,
      message: `${deductCoins} coins deducted successfully`,
      updatedCoins: userCoins.addCoins,
      customerContact: newContact.customerNumber,
    });
  } catch (err) {
    console.error("Deduct Coin Error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  profiderProfileCreation,
  providerProfile,
  providerDashBoard,
  providerUnderReview,
  buyCustomerContact,
};
