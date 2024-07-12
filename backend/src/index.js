const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const dbConnect = require("./config/db");
const UserRouter = require("./routes/user.routes");
const RoomRouter = require("./routes/room.routes");
const MsgRouter = require("./routes/message.routes");

require("dotenv").config();
const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_API_KEY, // Removed trailing
  },
});

app.use(express.json());
app.use(cors());
app.use("/users", UserRouter);
app.use("/room", RoomRouter);
app.use("/msg", MsgRouter);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

io.on("connection", (socket) => {
  console.log("A user Connected", socket.id);

  // join room ---
  socket.on("join-room", (room) => {
    socket.join(room.roomId);
    console.log(`${room.currentUser.name} joined room ${room.roomId}`);
  });

  // massaging ---
  socket.on("send-message", (message) => {
    console.log(message);
    socket.to(message.roomId).emit("get-message", message);
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

  // message-seen ---
  socket.on("set-message-seen", (message) => {
    socket.to(message.roomId).emit("get-message-seen", message);
  });

  //-- unseen messages --
  socket.on("set-unSeen", (unSeenData) => {
    io.emit("get-unSeen", unSeenData);
  });

  // block-user ---
  socket.on("set-block-user", (updatedObj) => {
    socket.to(updatedObj.roomId).emit("get-block-user", updatedObj);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server running on http://localhost:${PORT}`);
});
