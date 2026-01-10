const {
  signUpUser,
  loginUser,
  addUserAddress,
} = require("../services/user.service");

async function signUp(req, res) {
  try {
    const user = await signUpUser(req.body);

    return res.status(201).json({
      message: "User created successfully",
      type: user.userType,
      userId: user._id,
    });
  } catch (err) {
    if (err.message === "User already exists") {
      return res.status(422).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { user, provider, accessToken } = await loginUser(req.body, res);

    return res.status(200).json({
      accessToken,
      userID: user._id,
      userType: user.userType,
      providerStatus: provider ? provider.status : null,
      isLoggedIn: true,
    });
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    } else if (err.message === "Incorrect password") {
      return res.status(422).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}

// async function userProfile(req, res) {
//   try {
//     if (
//       req.user.type === "customer" ||
//       req.user.type === "provider" ||
//       req.user.type === "admin"
//     ) {
//       res.status(200).json({
//         authorized: true,
//         name: req.user.name,
//         message: "You are authorized.",
//       });
//     } else {
//       res.status(403).json({ message: "Access denied. Users only." });
//     }
//   } catch (err) {
//     console.log("Profile Error :", err.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

async function addAddress(req, res) {
  try {
    await addUserAddress(req.body);
    return res.status(201).json({ message: "Address added successfully" });
  } catch (err) {
    if (err.messgae === "Service not available in this city") {
      return res.status(422).json({ error: err.message });
    }
    if (err.message === "User not found") {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
}

module.exports = {
  signUp,
  login,
  addAddress,
  logout,
};
