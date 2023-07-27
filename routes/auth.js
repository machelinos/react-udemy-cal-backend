const express = require('express')
const { loginUser, createNewUser, renewToken } = require('../controllers/auth')
const router = express.Router()

router.post('/', loginUser)

router.post('/new', createNewUser)

router.get('/renew', renewToken)

module.exports = router
