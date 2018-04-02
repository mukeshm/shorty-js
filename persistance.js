const redis = require("redis")
const client = redis.createClient()

client.on("error", function (err) {
  console.error(err)
});

function saveUrl(shortCode, longUrl, cb) {
  client.set(shortCode, longUrl, cb)
}
exports.saveUrl = saveUrl

function getUrl(shortCode, cb){
  client.get(shortCode, cb)
}
exports.getUrl = getUrl
