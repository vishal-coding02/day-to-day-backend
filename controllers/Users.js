const Users = require("../models/UserModel");
const Address = require("../models/AddressModel");
const Providers = require("../models/ProviderModel");
const { generateToken } = require("../libs/auth/generateToken");
const bcryptjs = require("bcryptjs");
const { sendOTPEmail } = require("../libs/email/sendEmail");


async function signUp(req, res) {
  try {
    console.log(req.body);
    const { name, phone, password, userType, address, email } = req.body;
    console.log(req.body);

    const hashPass = await bcryptjs.hash(password, 10);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = await Users.create({
      userName: name,
      userPhone: phone,
      userEmail: email,
      userPassword: hashPass,
      userAddress: address,
      userType: userType,
      isVerified: false,
      verificationCode,
    });

    console.log("new user", newUser);

    await sendOTPEmail({
      toEmail: newUser.userEmail,
      userName: newUser.userName,
      verificationCode,
    });

    res.status(201).json({
      message: "User created successfully!",
      type: newUser.userType,
      userId: newUser._id,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  const { phone, email, password } = req.body;
  let user;
  if (phone) {
    user = await Users.findOne({ userPhone: phone });
  } else if (email) {
    user = await Users.findOne({ userEmail: email });
  } else {
    return res.status(400).json({ error: "Phone or email is required" });
  }

  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found" });
  }

  const provider = await Providers.findOne({ userID: user._id });

  if (!provider && user.userType === "provider") {
    console.log("provider not found");
    return res.status(404).json({ message: "Provider not found" });
  }

  const isMatch = await bcryptjs.compare(password, user.userPassword);
  if (!isMatch) {
    console.log("Invalid credentials");
    return res.status(401).send("Incorrect password");
  }

  const { accessToken, refreshToken } = generateToken(user);
  console.log("Setting cookie with refreshToken:", refreshToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  console.log("Set-Cookie header:", res.getHeaders()["set-cookie"]);
  res.json({
    accessToken: accessToken,
    userID: user._id,
    providerStatus: provider ? provider.status : null,
    userType: user.userType,
    isLoggedIn: true,
  });
}

async function userProfile(req, res) {
  try {
    if (
      req.user.type === "customer" ||
      req.user.type === "provider" ||
      req.user.type === "admin"
    ) {
      res.status(200).json({
        authorized: true,
        name: req.user.name,
        message: "You are authorized.",
      });
    } else {
      res.status(403).json({ message: "Access denied. Users only." });
    }
  } catch (err) {
    console.log("Profile Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addAddress(req, res) {
  try {
    console.log("Received request body:", req.body);
    const { address, id } = req.body;
    console.log("ID:", id, "Address:", address);

    const stateAddress = await Address.find({ city: address.city });
    console.log("State Address found:", stateAddress);

    if (!stateAddress) {
      return res.status(400).json({
        message:
          "Signup is restricted. Your state/city is not in the allowed list.",
      });
    }

    const user = await Users.findByIdAndUpdate(id, { userAddress: address });
    console.log("User updated:", user);

    if (user) {
      return res
        .status(200)
        .json({ message: "User found. Address has been added successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "User not found. Address could not be added." });
    }
  } catch (err) {
    console.log("Address Error :", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function logout(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, // prod me true
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({ message: "Logged out" });
}

module.exports = {
  signUp,
  login,
  userProfile,
  addAddress,
  logout
};
