const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  login,
  userProfile,
  addAddress,
} = require("../controllers/Users");
const { verifyToken } = require("../services/Auth");
// const pendingProvider = require("../middlewares/AdminMiddleware");

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);
userRouter.get("/profile", verifyToken, userProfile);
userRouter.post("/address", addAddress);

module.exports = userRouter;
