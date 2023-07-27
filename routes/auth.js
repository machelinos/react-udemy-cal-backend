const express = require('express')
const { loginUser, createNewUser, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')
const router = express.Router()

router.post(
  '/',
  [
    check('email', 'Email must be a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  loginUser,
)

router.post(
  '/new',
  [
    check('name', 'Name must be at least 5 characters')
      .not()
      .isLength({ max: 5 }),
    check('email', 'Email must be a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  createNewUser,
)

router.get('/renew', renewToken)

module.exports = router
