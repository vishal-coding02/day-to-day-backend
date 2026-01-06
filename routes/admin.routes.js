const express = require("express");
const adminRouter = express.Router();
const { verifyToken } = require("../libs/auth/generateToken");
const {
  fetchAllUsers,
  getPendingProvidersController,
  reviewProviderProfileController,
  sendProviderApprovalMailController,
  sendProviderRejectionMailController,
} = require("../controllers/admin.controller");

adminRouter.get("/users", verifyToken, fetchAllUsers);
adminRouter.get(
  "/pendingProviders",
  verifyToken,
  getPendingProvidersController
);
adminRouter.get(
  "/reviewProviderProfile/:id",
  verifyToken,
  reviewProviderProfileController
);
adminRouter.post(
  "/approveProvider",
  verifyToken,
  sendProviderApprovalMailController
);
adminRouter.post(
  "/rejectProvider",
  verifyToken,
  sendProviderRejectionMailController
);

module.exports = adminRouter;
