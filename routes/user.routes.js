const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  login,
  addAddress,
  logout
} = require("../controllers/user.controller");

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);
userRouter.post("/address", addAddress);
userRouter.post("/logout", logout)

module.exports = userRouter;
