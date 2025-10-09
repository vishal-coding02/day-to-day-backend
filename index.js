const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/UsersRoutes");
// const refresTokenRouter = require("./routes/RefreshTokenRoute");
const providersRouter = require("./routes/ProviderRoutes");
const customerRouter = require("./routes/CustomerRequestRoutes");
const compalintsRouter = require("./routes/ComplaintsRoutes");
const otpRouter = require("./routes/OtpRoute");
const adminRouter = require("./routes/AdminRoutes");
const packageRouter = require("./routes/ServicesPackageRoutes");
const coinsRouter = require("./routes/CoinsRoutes");
const rejectedRouter = require("./routes/RejectedProviderRoute");

app.use(cookieParser());
app.use(
  cors({
    origin: "https://day-to-day-frontend.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Server Port
const PORT = process.env.PORT;

// Server connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// All Routes
app.use("/users", userRouter);
// app.use(refresTokenRouter);
app.use("/providers", providersRouter);
app.use(customerRouter);
app.use(compalintsRouter);
app.use(otpRouter);
app.use("/admin", adminRouter);
app.use("/packages", packageRouter);
app.use(coinsRouter);
app.use(rejectedRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
