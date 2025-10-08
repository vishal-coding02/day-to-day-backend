const express = require("express");
const customerRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const {
  createRequest,
  myRequest,
  findProviders,
  customerProfile,
} = require("../controllers/CustomerRequests");

customerRouter.post("/customers/request", verifyToken, createRequest);
customerRouter.get("/customers/myRequest", verifyToken, myRequest);
customerRouter.get("/customers/providers", verifyToken, findProviders);
customerRouter.get("/customers/profile/:id", verifyToken, customerProfile);

module.exports = customerRouter;
