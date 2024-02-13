import './Home.css';
import Messages from './messages';
import Sending from './sendMessage';


const Chat = ({username, socket }) => {
  return (
    <div className="chatDiv">
      <div>
        <Messages socket={socket} />
        <Sending socket={socket} username={username} />
      </div>
    </div>
  );
};

export default Chat;