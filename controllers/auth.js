const { response } = require('express')
const User = require('../models/User')

const loginUser = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Login',
  })
}

const createNewUser = async (req, res = response) => {
  try {
    const user = new User(req.body)
    await user.save()

    res.status(201).json({
      ok: true,
      msg: 'Create user',
    })
  } catch (error) {
    console.log('error')
    res.status(500).json({
      ok: false,
      msg: 'There was an error. Contact admin',
    })
  }
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
