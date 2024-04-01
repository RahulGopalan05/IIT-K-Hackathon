import React, { useEffect, useState } from 'react';
import { Scene, Entity } from 'react-aframe-ar';

const ARComponent = () => {
  const modelSrc = './ship.glb'; // Replace with the path to your GLB model
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    return () => {
      // Stop all video tracks
      if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            stream.getTracks().forEach(track => {
              if (track.readyState === 'live' && track.kind === 'video') {
                track.stop();
              }
            });
          });
      }
    };
  }, []);

  return (
    <div>
      <button style={{position: 'absolute', right: '10px', top: '10px'}} onClick={() => setShowPopup(true)}>Show QR Code</button>
      {showPopup && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
          <div style={{backgroundColor: 'white'}}>
            <img src="/RAHUL_REDEV.png" alt="QR Code" style={{width: '200px', height: '200px'}} />
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
      <Scene embedded arjs='sourceType: webcam; debugUIEnabled: false;'>
        <a-assets>
          <a-asset-item id='furniture-model' src={modelSrc}></a-asset-item>
        </a-assets>
        <Entity
          gltf-model='#furniture-model'
          position={{x: 0, y: 0, z: 0}}
          scale={{x: 0.1, y: 0.1, z: 0.1}} // Adjust the scale as needed
        />
        <Entity camera look-controls />
      </Scene>
    </div>
  );
}

export default ARComponent;