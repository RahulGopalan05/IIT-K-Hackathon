import React, { useState } from "react";
import "./SUBMITFEEDBACK.css";
import Geotagging from "./geotagging"; // Import the Geotagging component

const SubmitFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWindow = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="frame-child64" onClick={openWindow} style={{ fontSize: '20px', color: 'white' }}>
        Add Location
      </button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <Geotagging />
            <button onClick={handleClose} style={{ marginRight: "10px", backgroundColor: "green", color: 'white' }}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitFeedback;