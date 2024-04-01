import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapWithHotspots from '../components/MapWithHotspots';

const FAQPage = () => {
  const [geolocation, setGeolocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGeolocation = async () => {
    try {
      const response = await axios.get('http://localhost:3001/latest-location');
      setGeolocation(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGeolocation();
  }, []);

  return (
    <div>
      <h1>Map Page</h1>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <MapWithHotspots geolocation={geolocation} />
        )}
      </div>
    </div>
  );
};

export default FAQPage;