const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect credentials',
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect credentials',
      })
    }

    //Generate JWT

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
    })
  } catch (error) {
    console.log('error')
    res.status(500).json({
      ok: false,
      msg: 'There was an error. Contact admin',
    })
  }
}

const createNewUser = async (req, res = response) => {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'The email is taken',
      })
    }

    user = new User(req.body)

    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
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
