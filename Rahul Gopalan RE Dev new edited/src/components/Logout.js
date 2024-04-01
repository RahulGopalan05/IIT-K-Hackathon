// Logout.js
import React, { useEffect } from 'react';

function Logout({ isLoggedIn }) {
  useEffect(() => {
    if (isLoggedIn) {
      // Send logout request to backend
      fetch('http://localhost:3001/logout', {
        method: 'GET',
        credentials: 'include', // Include cookies for session management
      })
        .then((response) => {
          // Handle response
          if (response.ok) {
            // Handle successful logout (redirect, clear local storage, etc.)
          } else {
            throw new Error('Logout failed');
          }
        })
        .catch((error) => {
          console.error('Logout error:', error);
        });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null; // Or return some other appropriate output
  }

  return <div>Logging out...</div>; // Optionally show a message while logging out
}

export default Logout;