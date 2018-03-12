const express = require('express')
const app = express()

const utils = require('./utils')
const PORT = process.env.PORT || 8080

app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello from shorty')
})

app.post('/shorten', [function (req, res, next) {
  if ('url' in req.body) {
    next()
  } else {
    res.status(400)
    res.json({'status': 'failure', 'reason': 'malformed request'})
  }
}, function (req, res) {
  let body = req.body
  let shortUrl = utils.generateShortUrl(body.url)
  let payload = {
    'short_url': shortUrl
  }
  let result = {
    'status': 'success',
    payload
  }
  res.json(result)
}])

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, function () {
  console.log('Shorty running on port : ', PORT)
})
