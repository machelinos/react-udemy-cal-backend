const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')

// Require dotenv.config
require('dotenv').config()

// Create express server
const app = express()

// Connect to database
dbConnection()

// CORS
app.use(cors())

// Serve static site in '/'
app.use(express.static('public'))

// parse and read body request
app.use(express.json())

// Routes
const auth = require('./routes/auth')
app.use('/api/auth', auth)
// TODO: Events CRUD: create, login, renew

/* app.get('/', (req, res) => {
  console.log('/ required')

  res.json({
    ok: true,
  })
}) */

// Listen to requests on port
app.listen(process.env.PORT, () => {
  console.log(`Server running in port: ${process.env.PORT}`)
})
