const express = require("express");
const customerRouter = express.Router();
const { verifyToken } = require("../libs/auth/generateToken");
const {
  createCustomerRequestController,
  getMyCustomerRequestsController,
  searchProvidersController,
  customerProfileController,
} = require("../controllers/customer.controller");

customerRouter.post(
  "/request",
  verifyToken,
  createCustomerRequestController
);
customerRouter.get(
  "/myRequest",
  verifyToken,
  getMyCustomerRequestsController
);
customerRouter.get(
  "/providers",
  verifyToken,
  searchProvidersController
);
customerRouter.get(
  "/profile/:id",
  verifyToken,
  customerProfileController
);

module.exports = customerRouter;
