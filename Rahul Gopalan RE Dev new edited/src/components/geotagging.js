import React, { useState } from 'react';
import axios from 'axios';

const Geotagging = () => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Location:', location);
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    try {
      await axios.post('http://localhost:3001/location', { location, latitude, longitude });
      alert('Geolocation saved!');
    } catch (error) {
      console.error('Error saving geolocation:', error);
      alert('Error saving geolocation. Please try again.');
    }
  };

  return (
    <div>
      <h2>Geotagging</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Latitude:
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </label>
        <label>
          Longitude:
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
        <button type="submit">Save Geolocation</button>
      </form>
    </div>
  );
};

export default Geotagging;
