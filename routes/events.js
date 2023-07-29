const express = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { isDate } = require('../helpers/isDate')
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events')
const router = express.Router()

router.get('/', validateJWT, getEvents)

router.post(
  '/',
  [
    validateJWT,
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'start date is required').custom(isDate),
    check('end', 'end date is required').custom(isDate),
    validateFields,
  ],
  createEvent,
)

router.put('/:id', validateJWT, updateEvent)

router.delete('/:id', validateJWT, deleteEvent)

module.exports = router
