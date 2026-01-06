const express = require("express");
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

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["https://day-to-day-frontend.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/users", userRouter);
app.use("/api", refresTokenRouter);
app.use("/providers", providersRouter);
app.use("/customers", customerRouter);
app.use(compalintsRouter);
app.use(otpRouter);
app.use("/admin", adminRouter);
app.use("/packages", packageRouter);
app.use(coinsRouter);
app.use(rejectedRouter);

module.exports = app;
