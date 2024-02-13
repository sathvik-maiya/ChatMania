const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const ADMIN_BOT = "Admin";
let Users_list = [];

function leaveRoom(userID, chatRoomUsers) {
  return chatRoomUsers.filter((user) => user.id != userID);
}

io.on("connection", (socket) => {


  socket.on("start_chatting", (data) => {
    const { username } = data;
    const room = "chatMania";
    socket.join(room);

    let created_time = Date.now();

    socket.to(room).emit("receive_message", {
      message: `${username} has joined chatMania`,
      username: ADMIN_BOT,
      created_time,
    });

    socket.emit("receive_message", {
      message: `Welcome to chatMania`,
      username: ADMIN_BOT,
      created_time,
    });

    Users_list.push({ id: socket.id, username, room });
    socket.emit(
      "All_users",
      Users_list.filter((user) => user.room === room)
    );

    socket.on("send_message", (data) => {
      io.in(room).emit("receive_message", data);
    });

    socket.on("leave_room", (data) => {
      const { username } = data;
      socket.leave(room);
    let created_time = Date.now();
      Users_list = leaveRoom(socket.id, Users_list);
      socket.to(room).emit("All_users", Users_list);
      socket.to(room).emit("receive_message", {
        username: ADMIN_BOT,
        message: `${username} has left chatMania`,
        created_time,
      });
    
    });
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
