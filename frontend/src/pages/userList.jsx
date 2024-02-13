import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = ({ socket, username }) => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('All_users', (data) => {
      setUsers(data);
    });

    return () => socket.off('All_users');
  }, [socket]);

  const leaveRoom = () => {
    const time = Date.now();
    socket.emit('leave_room', { username, time });
    navigate('/', { replace: true });
  };

  return (
    <div className="UsersContainer">
      <h2 className="Title">ChatMania.io</h2>

      <div>
        {users.length > 0 && <h5 className="users">Online Users:</h5>}
        <ul className="allUsers">
          {users.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='button' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default UserList;