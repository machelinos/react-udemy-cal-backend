const express = require('express')

// Create express server
const app = express()

// Routes
app.get('/', (req, res) => {
  console.log('/ required')

  res.json({
    ok: true,
  })
})

// Listen to requests on port
app.listen(4000, () => {
  console.log(`Server running in port: ${4000}`)
})
