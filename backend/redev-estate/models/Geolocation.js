// models/Geolocation.js

const mongoose = require('mongoose');

const geolocationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

module.exports = mongoose.model('Geolocation', geolocationSchema);