import "./Home.css"
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, socket }) => {

 const navigate = useNavigate();

 const startChatting = () => {
    if (username !== '') {
      socket.emit('start_chatting', {username});
       navigate('/chats', { replace: true });
    }
   
  };

  return (
    <div className="mainContainer">
      <div className="insideContainer">
        <h1 className="heading">ChatMania.io</h1>
        <input className="input" placeholder='Enter Username'  onChange={(e) => setUsername(e.target.value)} />
        <button className='button' onClick={startChatting}>Start Chatting</button>
      </div>
    </div>
  );
};

export default Home;