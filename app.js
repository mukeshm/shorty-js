const path = require('path')
const express = require('express')
const app = express()

const utils = require('./utils')
const persistance = require('./persistance')

const PORT = process.env.PORT || 8080
const DOMAIN = process.env.domain || 'http://127.0.0.1:8080'

app.use(express.json())
app.use(express.static('static'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/shorten', [function (req, res, next) {
  if ('url' in req.body) {
    next()
  } else {
    res.status(400).json({'status': 'failure', 'reason': 'malformed request'})
  }
}, function (req, res) {
  let body = req.body
  let shortCode = utils.generateShortCode()
  let shortUrl = utils.createShortUrl(DOMAIN, shortCode)
  persistance.saveUrl(shortCode, body.url, function(){
    let payload = {
      'short_url': shortUrl
    }
    let result = {
      'status': 'success',
      payload
    }
    res.json(result)
  })
}])

app.get('/:shortcode', function (req, res, next){
  let shortCode = req.params.shortcode
  persistance.getUrl(shortCode, function (err, reply){
    if (err){
      throw err
    } else if (reply == null){
      next()
    } else {
      res.redirect(reply.toString())
    }
  })
})

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
