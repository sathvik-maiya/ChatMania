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

  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});