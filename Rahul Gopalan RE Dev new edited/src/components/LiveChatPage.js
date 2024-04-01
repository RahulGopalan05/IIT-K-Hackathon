import React from 'react';
import Chatbot from './Chatbot'; // Assuming Chatbot.js is in the same directory

const LiveChatPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Chatbot />
    </div>
  );
};

export default LiveChatPage;