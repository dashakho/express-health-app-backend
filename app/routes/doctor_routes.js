// const axios = require('axios')
require('dotenv').config()
// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// pull in Mongoose model for examples
const DoctorEntry = require('../models/doctor')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
// INDEX
// GET /examples
router.get('/doctors', requireToken, (req, res, next) => {
  DoctorEntry.find()
    .then(doctors => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return doctors.map(doctor => doctor.toObject())
    })
    .then(doctors => {
      doctors.map(doctor => {
        if (JSON.stringify(req.user._id) === JSON.stringify(doctor.owner)) {
          doctor.editable = true
        } else {
          doctor.editable = false
        }
      })
      return doctors
    })
    // respond with status 200 and JSON of the examples
    .then(doctors => res.status(200).json({ doctors: doctors }))
    // if an error occurs, pass it to the handler
    .catch(next)
})
// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/doctors/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  DoctorEntry.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(doctor => res.status(200).json({ doctor: doctor.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})
// CREATE
// POST /examples
router.post('/doctors', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.doctor.owner = req.user.id
  DoctorEntry.create(req.body.doctor)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(doctor => {
      const doctorObject = doctor.toObject()
      doctorObject.editable = true
      return doctorObject
    })
    .then(doctorObject => {
      res.status(201).json({ doctor: doctorObject })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})
// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/doctors/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.doctor.owner
  DoctorEntry.findById(req.params.id)
    .then(handle404)
    .then(doctor => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, doctor)
      // pass the result of Mongoose's `.update` to the next `.then`
      return doctor.update(req.body.doctor)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})
// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/doctors/:id', requireToken, (req, res, next) => {
  DoctorEntry.findById(req.params.id)
    .then(handle404)
    .then(doctor => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, doctor)
      // delete the example ONLY IF the above didn't throw
      doctor.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})
module.exports = router
