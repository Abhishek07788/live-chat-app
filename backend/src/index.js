const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_API_KEY, // Removed trailing slash
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

io.on("connection", (socket) => {
  console.log("A user Connected", socket.id);

  socket.on("send-message", (message) => {
    console.log(message);
    socket.to(message.roomId).emit("get-message", message);
  });

  // join room ---
  socket.on("join-room", (room) => {
    socket.join(room.roomId);
    console.log(`${room.currentUser.name} joined room ${room.roomId}`);
  });

  // is online ---
  socket.on("set-is-online", (online) => {
    console.log(`${online.roomId} is Online.`);
    socket.to(online.roomId).emit("get-is-online", online);
  });

  // typing ---
  socket.on("set-typing", (typing) => {
    socket.to(typing.roomId).emit("get-typing", typing);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
