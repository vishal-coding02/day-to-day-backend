const express = require("express");
const rejectedRouter = express.Router();
const { verifyToken } = require("../libs/auth/generateToken");
const { rejectedProvider } = require("../controllers/RejectedProvider");

rejectedRouter.get("/rejected/:id", verifyToken, rejectedProvider);

module.exports = rejectedRouter;
