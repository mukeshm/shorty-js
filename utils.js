const uuidv4 = require('uuid/v4')

function generateCode () {
  return uuidv4()
}

exports.generateCode = generateCode
