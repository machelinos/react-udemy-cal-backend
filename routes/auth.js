const express = require('express')
const { loginUser, createNewUser, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const router = express.Router()

router.post(
  '/',
  [
    check('email', 'Email must be a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
    validateFields,
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
    validateFields,
  ],
  createNewUser,
)

router.get('/renew', renewToken)

module.exports = router
