const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const inventory = (req, res) => {
  database('inventory').select()
  .then(inventory => {
    res.status(200).json({inventory: inventory})
  })
  .catch(err => res.status(500).send(err))
}

const newOrder = (req, res) => {
  let order = req.body
  let total = Number(order.total)
  database('orders').returning(['id','total', 'created_at']).insert({total: total})
  .then(order => {
    res.status(201).send(order)
  })
  .catch(err => res.status(500).send(err))
}

const getOrders = (req, res) => {
  database('orders').select()
  .then(orders => {
    res.status(200).json({orders: orders})
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  inventory: inventory,
  newOrder: newOrder,
  getOrders: getOrders
}