const express = require("express");
const compalintsRouter = express.Router();
const { verifyToken } = require("../libs/auth/generateToken");
const { usersComplaints } = require("../controllers/Complaints");

compalintsRouter.post("/help/complaint", verifyToken, usersComplaints);

module.exports = compalintsRouter;
