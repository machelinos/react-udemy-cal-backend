const { response } = require('express')
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate('user', 'name')

    res.status(200).json({
      ok: true,
      events,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Contact admin',
    })
  }
}

const createEvent = async (req, res = response) => {
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

const updateEvent = async (req, res = response) => {
  try {
    const eventId = req.params.id
    const event = req.body
    const updatedEvent = await Event.findByIdAndUpdate(eventId, event, {
      new: true,
    }).populate('user', 'name')

    if (!updatedEvent) {
      return res.status(404).json({
        ok: false,
        msg: 'Couldnt find event with this id',
      })
    }

    res.status(200).json({
      ok: true,
      event: updatedEvent,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Contact admin',
    })
  }
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
