const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
  taxonomy_description: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  postal_code: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('DoctorEntry', doctorSchema)
