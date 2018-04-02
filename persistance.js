const redis = require("redis")
const client = redis.createClient();

client.on("error", function (err) {
  console.log("Redis error " + err);
});

function saveUrl(shortCode, longUrl, cb) {
  client.set(shortCode, longUrl, cb)
}
exports.saveUrl = saveUrl
