import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    try {
      const response = await axios.post(
        'https://api.edenai.run/v2/text/chat',
        {
          text: message,
          chatbot_global_action: "Act as an assistant",
          previous_history: [],
          temperature: 0.0,
          max_tokens: 150,
          providers: 'openai',
          fallback_providers: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2FkZjRmYjctZGVlNC00MWI3LTk5ZmItMDM3NTdhNDYxY2MyIiwidHlwZSI6ImFwaV90b2tlbiJ9.5UAeIkvgdy-KYTYgSIGPV7uIdWlCbsCxIJa5Aqsyhfc',
          },
        }
      );

      setConversation([...conversation, { text: message, isUser: true }, { text: response.data.openai.generated_text, isUser: false }]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {conversation.map((message, index) => (
        <p key={index} className={message.isUser ? 'user-message' : 'bot-message'}>{message.text}</p>
      ))}
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
