const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

app.get('/', function (req, res) {
  res.send('Hello from shorty')
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
