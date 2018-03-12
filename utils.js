const uuidv4 = require('uuid/v4')
const DOMAIN = process.env.domain || 'localhost:8080'

function generateCode () {
  return uuidv4()
}

function generateShortUrl (url) {
  console.log(generateCode())
  console.log(DOMAIN)
  return url
}
exports.generateShortUrl = generateShortUrl
