const express = require("express");
const providersRouter = express();
const {
  createProviderProfile,
  getProviderProfile,
  getProviderDashBoard,
  providerUnderReviewController,
  unlockCustomerContact,
} = require("../controllers/provider.controller");
const { verifyToken } = require("../libs/auth/generateToken");

providersRouter.post("/profileCreation", createProviderProfile);
providersRouter.get("/profile/:id", verifyToken, getProviderProfile);
providersRouter.get("/providerDashBoard", verifyToken, getProviderDashBoard);
providersRouter.get(
  "/providerUnderReview/:id",
  verifyToken,
  providerUnderReviewController
);
providersRouter.post("/customerContact", verifyToken, unlockCustomerContact);

module.exports = providersRouter;
