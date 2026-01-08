const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const refresTokenRouter = require("./routes/RefreshTokenRoute");
const providersRouter = require("./routes/provider.routes");
const customerRouter = require("./routes/customer.routes");
const compalintsRouter = require("./routes/ComplaintsRoutes");
const otpRouter = require("./routes/OtpRoute");
const adminRouter = require("./routes/admin.routes");
const packageRouter = require("./routes/ServicesPackageRoutes");
const coinsRouter = require("./routes/CoinsRoutes");
const rejectedRouter = require("./routes/RejectedProviderRoute");

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/api", refresTokenRouter);
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
