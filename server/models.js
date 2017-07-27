const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const inventory = (req, res) => {
  database('inventory').select()
  .then(inventory => {
    res.status(200).json({inventory: inventory})
  })
}

module.exports = {
  inventory: inventory
}