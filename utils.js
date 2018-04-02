const url = require('url');
const shortid = require('shortid');

function generateShortCode () {
  return shortid.generate()
}
exports.generateShortCode = generateShortCode

function createShortUrl (domain, shortcode) {
  let shorturl = new url.URL(shortcode, domain);
  return shorturl
}
exports.createShortUrl = createShortUrl
