const Users = require("../models/UserModel");
const Providers = require("../models/ProviderModel");
const Address = require("../models/AddressModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../libs/auth/generateToken");
const { sendOTPEmail } = require("../libs/email/sendEmail");

async function signUpUser(data) {
  const { name, phone, email, password, userType, address } = data;

  const existingUser = await Users.findOne({
    $or: [{ userEmail: email }, { userPhone: phone }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const user = await Users.create({
    userName: name,
    userPhone: phone,
    userEmail: email,
    userPassword: hashPass,
    userAddress: address,
    userType: userType,
    isVerified: false,
    verificationCode,
  });

  await sendOTPEmail({
    toEmail: user.userEmail,
    userName: user.userName,
    verificationCode,
  });

  return user;
}

async function loginUser(data, res) {
  const { phone, email, password } = data;

  const user = phone
    ? await Users.findOne({ userPhone: phone })
    : await Users.findOne({ userEmail: email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.userPassword);
  if (!isMatch) throw new Error("Incorrect password");

  const provider =
    user.userType === "provider"
      ? await Providers.findOne({ userID: user._id })
      : null;

  const { accessToken, refreshToken } = generateToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return { accessToken, user, provider };
}

async function addUserAddress(data) {
  const { id, address } = data;
  console.log("ID:", id, "Address:", address);

  const cityAddress = await Address.find({ city: address.city });
  console.log("State Address found:", cityAddress);

  if (!cityAddress) {
    throw new Error("Service not available in this city");
  }

  const user = await Users.findByIdAndUpdate(id, {
    userAddress: address,
  });

  console.log("User updated:", user);

  if (!user) throw new Error("User not found");

  return true;
}

module.exports = {
  signUpUser,
  loginUser,
  addUserAddress,
};
