let express = require('express')
let app = express()
let port = process.env.PORT || 3000
const path = require('path')
let routes = require('./apiRoutes')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, '../public/assets/')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

app.use('/api/v1', routes)

app.listen(port, () => {
  process.stdout.write('\033c')
  console.log(`Amazon Final listening on ${port}`)
})

module.exports = app