const express = require("express");
const refresTokenRouter = express.Router();
const { refreshToken } = require("../services/Auth");

refresTokenRouter.post("/refreshToken", refreshToken);

module.exports = refresTokenRouter;
