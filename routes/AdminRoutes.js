const express = require("express");
const adminRouter = express.Router();
const { verifyToken } = require("../libs/auth/generateToken");
const {
  allUsers,
  pendingProviders,
  reviewProviderProfile,
  approveMail,
  rejectMail,
} = require("../controllers/Admin");

adminRouter.get("/users", verifyToken, allUsers);
adminRouter.get("/pendingProviders", verifyToken, pendingProviders);
adminRouter.get(
  "/reviewProviderProfile/:id",
  verifyToken,
  reviewProviderProfile
);
adminRouter.post("/approveProvider", verifyToken, approveMail);
adminRouter.post("/rejectProvider", verifyToken, rejectMail);

module.exports = adminRouter;
