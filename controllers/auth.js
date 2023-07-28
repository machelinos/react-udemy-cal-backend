const { response } = require('express')

const loginUser = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Login',
  })
}

const createNewUser = (req, res = response) => {
  const { name, email, password } = req.body

  res.status(201).json({
    ok: true,
    msg: 'Create user',
    name,
    email,
    password,
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
