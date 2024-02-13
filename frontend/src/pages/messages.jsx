import  './Home.css';
import { useState, useEffect } from 'react';


const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([]);

//setting message entered by user
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          created_time: data.created_time,
        },
      ]);
    });


    return () => socket.off('receive_message');
  }, [socket]);


  //formatting time stamp into HH:MM format
function formatTime(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

  return (
    <div className="messagesContainer">
      {messages.map((msg, i) => (
        <div className="message" key={i}>
          <div className='cont'>
            <span className="userName">{msg.username}</span>
            <span className="Time">
              {formatTime(msg.created_time)}
            </span>
          </div>
          <p className="msgText">{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages; 