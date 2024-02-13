import './Home.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const created_time = Date.now();
      // Send message to server. 
      socket.emit('send_message', { username, message, created_time });
      setMessage('');
    }
  };

  return (
    <div className="sendMessage">
      <input
        className="messageInput"
        placeholder='Enter your message'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
 <button className='button' onClick={sendMessage}>
        Send 
      </button>
    </div>
  );
};

export default SendMessage;