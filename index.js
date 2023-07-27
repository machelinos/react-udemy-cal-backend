const express = require('express')

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
app.listen(4000, () => {
  console.log(`Server running in port: ${4000}`)
})
