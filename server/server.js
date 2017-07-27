let express = require('express')
let app = express()
let port = process.env.PORT || 3000
let routes = require('./apiRoutes')

app.use('/api/v1', routes)

app.listen(port, () => {
  process.stdout.write('\033c')
  console.log(`Amazon Final listening on ${port}`)
})