let express = require('express')
let r = express.Router()
let models = require('./models')

r.get('/inventory', models.inventory)
r.get('/orders', models.getOrders)
r.post('/orders', models.newOrder)


module.exports = r 