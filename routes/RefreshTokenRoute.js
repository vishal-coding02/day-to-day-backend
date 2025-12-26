const express = require("express");
const refresTokenRouter = express.Router();
const { refreshToken } = require("../libs/auth/generateToken");

refresTokenRouter.post("/refreshToken", refreshToken);

module.exports = refresTokenRouter;
