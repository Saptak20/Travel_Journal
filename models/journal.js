const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      trim: true,
      immutable: true
    },
    arrivalDate: {
      type: Date,
      required: true
    },
    departureDate: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          return !this.arrivalDate || value >= this.arrivalDate;
        },
        message: 'Departure date must be on or after the arrival date.'
      }
    },
    experience: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Journal', journalSchema);
