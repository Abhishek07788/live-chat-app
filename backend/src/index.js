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

  // for messaging ---
  socket.on("send-message", (message) => {
    // Corrected the event name
    console.log("message: ", message);

    io.emit("get-message", message); // Corrected the event name
  });

  // for typing ---
  socket.on("set-typing", (isTyping) => {
    io.emit("get-typing", isTyping);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
