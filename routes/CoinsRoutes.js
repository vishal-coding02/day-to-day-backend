const express = require("express");
const coinsRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const {
  purchaseCoin,
  fetchCoins,
  deductCoins,
  unlockedContact,
} = require("../controllers/Coins");

coinsRouter.post("/buyCoins", verifyToken, purchaseCoin);
coinsRouter.get("/coins", verifyToken, fetchCoins);
coinsRouter.patch("/coins", verifyToken, deductCoins);
coinsRouter.get("/hasUnlocked/:id", verifyToken, unlockedContact);

module.exports = coinsRouter;
