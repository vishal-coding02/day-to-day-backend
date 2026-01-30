const redis = require("redis");

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("connect", () => {
  console.log("Redis connect");
});

client.on("error", () => {
  console.log("Redis error", err);
})(async () => {
  await client.connect();
})();

module.exports = client;
