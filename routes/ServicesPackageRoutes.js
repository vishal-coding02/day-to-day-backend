const express = require("express");
const packageRouter = express.Router();
const { verifyToken } = require("../services/Auth");
const {
  createPackages,
  myPackages,
} = require("../controllers/ServicePackages");

packageRouter.post("/addPackages", verifyToken, createPackages);
packageRouter.get("/providerPackages/:id", verifyToken, myPackages);

module.exports = packageRouter;
