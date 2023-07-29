const { response } = require('express')

const getEvents = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'Get events',
  })
}

const createEvent = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'Create event',
  })
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
