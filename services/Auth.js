const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
// const JWT_REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

function generateToken(user) {
  const accessToken = jwt.sign(
    {
      id: user._id,
      name: user.userName,
      type: user.userType,
    },
    JWT_ACCESS_SECRET_KEY,
    { expiresIn: "1h" }
  );
  console.log(accessToken);
  // const refreshToken = jwt.sign(
  //   {
  //     id: user._id,
  //     name: user.userName,
  //     type: user.userType,
  //   },
  //   JWT_REFRESH_SECRET_KEY,
  //   { expiresIn: "7d" }
  // );
  // console.log(refreshToken);

  return { accessToken };
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Token missing");
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET_KEY);
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    console.log("Invalid Token", err.message);
    return res.status(400).json({ message: "Invalid Token" });
  }
}

// async function refreshToken(req, res) {
//   const token = req.cookies.refreshToken;
//   console.log(token);
//   if (!token) return res.status(401).json({ message: "Token missing" });

//   try {
//     const payload = jwt.verify(token, JWT_REFRESH_SECRET_KEY);
//     const newAccessToken = jwt.sign(
//       {
//         id: payload.id,
//         name: payload.name,
//         type: payload.type,
//       },
//       JWT_ACCESS_SECRET_KEY,
//       { expiresIn: "15m" }
//     );
//     res.json({ accessToken: newAccessToken });
//   } catch {
//     return res.status(403).json({ message: "Invalid refresh token" });
//   }
// }

module.exports = {
  bcryptjs,
  jwt,
  JWT_ACCESS_SECRET_KEY,
  // JWT_REFRESH_SECRET_KEY,
  generateToken,
  verifyToken,
  // refreshToken,
};
