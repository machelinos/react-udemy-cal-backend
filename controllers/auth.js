const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

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

    const token = await generateJWT(user.id, user.name)

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
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

    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    })
  } catch (error) {
    console.log('error')
    res.status(500).json({
      ok: false,
      msg: 'There was an error. Contact admin',
    })
  }
}

const renewToken = async (req, res = response) => {
  try {
    const uid = req.uid
    const name = req.name
    const token = await generateJWT(uid, name)

    res.status(200).json({
      ok: true,
      uid: uid,
      name: name,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'There was an error. Contact admin',
    })
  }
}

module.exports = {
  loginUser,
  createNewUser,
  renewToken,
}
