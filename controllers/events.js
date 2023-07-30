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
    const userId = req.uid

    const eventFound = await Event.findById(eventId)

    if (!eventFound) {
      return res.status(404).json({
        ok: false,
        msg: 'No event with this id',
      })
    }

    const newEvent = { ...req.body, user: userId }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
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

const deleteEvent = async (req, res = response) => {
  try {
    const eventId = req.params.id
    const userId = req.uid

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: 'There is no event with this id',
      })
    }

    if (event.user.toString() !== userId) {
      return res.status(401).json({
        ok: false,
        msg: 'Only event creator can delete event',
      })
    }

    const eventDeleted = await Event.findByIdAndDelete(eventId)

    res.status(200).json({
      ok: true,
      event: eventDeleted,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Contact admin',
    })
  }
}

module.exports = {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
}
