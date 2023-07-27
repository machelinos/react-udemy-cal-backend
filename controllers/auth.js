const { response } = require('express')

const loginUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Login',
  })
}

const createNewUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Create user',
  })
}

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew',
  })
}

module.exports = {
  loginUser,
  createNewUser,
  renewToken,
}
