const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { nationalities, travelStyles, continents } = require('../config/choices');

const userSchema = new mongoose.Schema(
  {
    nationality: {
      type: String,
      required: true,
      enum: nationalities
    },
    travelStyle: {
      type: String,
      required: true,
      enum: travelStyles
    },
    favoriteContinent: {
      type: String,
      required: true,
      enum: continents
    }
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
