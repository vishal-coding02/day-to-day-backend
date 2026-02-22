const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const refresTokenRouter = require("./routes/RefreshTokenRoute");
const providersRouter = require("./routes/provider.routes");
const customerRouter = require("./routes/customer.routes");
const compalintsRouter = require("./routes/ComplaintsRoutes");
const otpRouter = require("./routes/OtpRoute");
const adminRouter = require("./routes/admin.routes");
const packageRouter = require("./routes/ServicesPackageRoutes");
const coinsRouter = require("./routes/CoinsRoutes");
const rejectedRouter = require("./routes/RejectedProviderRoute");
const apiLimiter = require("./middleware/rateLimiter");
const helmet = require("helmet");

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.set("trust proxy", 1);
app.use(helmet());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Server Port
const PORT = process.env.PORT;

// DataBase connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err.message));

// Rate Limit Routes

app.use("/auth/login", apiLimiter);
app.use("/auth/signUp", apiLimiter);
app.use("/auth/reset-password", apiLimiter);
app.use("/auth/search-user", apiLimiter);

// All Routes
app.use("/auth", authRouter);
app.use("/api", refresTokenRouter);
app.use("/providers", providersRouter);
app.use("/customers", customerRouter);
app.use(compalintsRouter);
app.use(otpRouter);
app.use("/admin", adminRouter);
app.use("/packages", packageRouter);
app.use(coinsRouter);
app.use(rejectedRouter);

// Server connection

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
