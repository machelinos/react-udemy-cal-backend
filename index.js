const express = require('express')
// Require dotenv.config
require('dotenv').config()

// Create express server
const app = express()

// Serve static site in '/'
app.use(express.static('public'))

// Routes
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
