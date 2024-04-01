const express = require('express');
const cors = require('cors');
const NodeGeocoder = require('node-geocoder');
const Geolocation = require('../models/Geolocation'); // import the Geolocation model
const router = express.Router();

const options = {
  provider: 'openstreetmap'
};

const geocoder = NodeGeocoder(options);

// Add this line to enable CORS
router.use(cors());

router.post('/location', async (req, res) => {
  const { location } = req.body;
  try {
    const geoResponse = await geocoder.geocode(location);
    console.log('Location:', location);
    console.log('Geocoded Latitude:', geoResponse[0].latitude); // log the geocoded latitude
    console.log('Geocoded Longitude:', geoResponse[0].longitude); // log the geocoded longitude

    const geolocation = new Geolocation({
      location,
      latitude: geoResponse[0].latitude,
      longitude: geoResponse[0].longitude,
    });

    await geolocation.save();

    // Add this line to include the Access-Control-Allow-Origin header in the response
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.json({ message: 'Location saved', geolocation });
  } catch (error) {
    console.error(error); // log the error
    res.status(500).json({ message: 'Error geocoding address', error });
  }
});

router.get('/latest-location', async (req, res) => {
  try {
    const location = await Geolocation.findOne().sort('-_id').exec();
    // Send the latest location to the client
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;