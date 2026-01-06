const cluster = require("cluster");
const os = require("os");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master PID: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", () => cluster.fork());
} else {
  connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} | Worker PID: ${process.pid}`);
  });
}
