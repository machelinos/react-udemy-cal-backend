const { response } = require('express')

const loginUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Login',
  })
}

const createNewUser = (req, res = response) => {
  const { name, email, password } = req.body

  if (name.length <= 4) {
    return res.status(400).json({
      ok: false,
      msg: 'Name must be at least 5 chatacters',
    })
  }

  res.json({
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
