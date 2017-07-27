let express = require('express')
let r = express.Router()
let models = require('./models')

r.get('/inventory', models.inventory)

module.exports = r 