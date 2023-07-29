const { response } = require('express')
const Event = require('../models/Event')

const getEvents = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Get events',
  })
}

const createEvent = async (req, res = response) => {
  console.log(req.body)

  const event = new Event(req.body)
  event.user = req.uid
  const savedEvent = await event.save()

  res.status(201).json({
    ok: true,
    event: savedEvent,
  })

  try {
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Contact admin',
    })
  }
}

const updateEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Update event',
  })
}

const deleteEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Delete event',
  })
}

module.exports = {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
}
