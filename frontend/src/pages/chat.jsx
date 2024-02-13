import './Home.css';
import Messages from './messages';
import Sending from './sendMessage';
import UsersList from './userList';

const Chat = ({username, socket }) => {
  return (
    <div className="chatDiv">
      <UsersList socket={socket} username={username} />
      <div>
        <Messages socket={socket} />
        <Sending socket={socket} username={username} />
      </div>
    </div>
  );
};

export default Chat;