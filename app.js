const express = require('express')
const config = require('config')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', require('./routes/stories.routes.js'))

const PORT = config.get('port') || 5000
async function start() {
  try {
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}..`)
    )
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
