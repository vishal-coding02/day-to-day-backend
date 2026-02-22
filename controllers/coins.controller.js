const Coins = require("../models/CoinsModel");
const Users = require("../models/UserModel");

const purchaseCoin = async (req, res) => {
  try {
    const { name, phone, packageID, packageName, coins, price, paymentMethod } =
      req.body;

    if (!(req.user.type === "customer" || req.user.type === "provider")) {
      return res.status(403).json({
        success: false,
        message: "Only customers and providers can purchase coins",
      });
    }

    const user = await Users.findOne({ userPhone: phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this phone not found",
      });
    }

    let purchase = await Coins.findOne({ userID: user._id });

    if (purchase) {
      purchase.addCoins = purchase.addCoins + coins;
      purchase.addPrice = purchase.addPrice + price;
      await purchase.save();
    } else {
      // create new
      purchase = await Coins.create({
        userID: user._id,
        name,
        phone,
        packageID,
        packageName,
        addCoins: coins,
        addPrice: price,
        paymentMethod,
        status: "success",
      });
    }

    res.status(201).json({
      success: true,
      message: `${coins} coins purchased successfully`,
    });
  } catch (err) {
    console.error("Coin Purchase Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const fetchCoins = async (req, res) => {
  try {
    if (!(req.user.type === "customer" || req.user.type === "provider")) {
      return res.status(403).json({
        success: false,
        message: "Only customers and providers can fetch coins",
      });
    }

    const getCoins = await Coins.findOne({ userID: req.user.id });

    res.status(200).json({
      success: true,
      message: "coins fetched successfully",
      userCoins: getCoins.addCoins,
    });
  } catch (err) {
    console.error("Fetch Coin Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deductCoins = async (req, res) => {
  try {
    if (!(req.user.type === "customer" || req.user.type === "provider")) {
      return res.status(403).json({
        success: false,
        message: "Only customers and providers can deduct coins",
      });
    }

    const { deduct, id } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.user.id,
      { $push: { providerContactList: id } },
      { new: true, runValidators: false }
    );

    const userCoins = await Coins.findOne({ userID: req.user.id });
    if (!userCoins || userCoins.addCoins < deduct) {
      return res.status(400).json({
        success: false,
        message: "Not enough coins",
      });
    }

    userCoins.addCoins -= deduct;
    await userCoins.save();

    res.status(200).json({
      success: true,
      message: `${deduct} coins deducted successfully`,
      updatedCoins: userCoins.addCoins,
      updatedUser: user,
    });
  } catch (err) {
    console.error("Deduct Coin Error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Check if customer has unlocked provider contact
async function unlockedContact(req, res) {
  try {
    const customer = await Users.findById(req.user.id);
    const { id } = req.params;

    const alreadyUnlocked = customer.providerContactList.includes(id);

    res.json({ unlocked: alreadyUnlocked });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = { purchaseCoin, fetchCoins, deductCoins, unlockedContact };
