const express = require("express");
const authRouter = express.Router();
const {
  signUp,
  login,
  addAddress,
  logout,
  searchUsersController,
  resetPasswordController,
} = require("../controllers/auth.controller");

authRouter.post("/signUp", signUp);
authRouter.post("/login", login);
authRouter.post("/address", addAddress);
authRouter.post("/logout", logout);
authRouter.get("/search-user", searchUsersController);
authRouter.post("/reset-password", resetPasswordController);

module.exports = authRouter;
