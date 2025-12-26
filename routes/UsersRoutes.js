const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  login,
  userProfile,
  addAddress,
  logout
} = require("../controllers/Users");
const { verifyToken } = require("../libs/auth/generateToken");

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);
userRouter.get("/profile", verifyToken, userProfile);
userRouter.post("/address", addAddress);
userRouter.post("/logout", logout)

module.exports = userRouter;
