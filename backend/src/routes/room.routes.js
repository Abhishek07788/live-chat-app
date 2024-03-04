const express = require("express");
const Room = require("../schemas/room.schema");

const app = express.Router();

// -- create room ----
app.post("/join", async (req, res) => {
  const { roomId } = req.body;
  try {
    // Check if the room already exists
    const room = await Room.findOne({ roomId }).populate(
      "user1 user2",
      "-password"
    );
    if (room) {
      return res
        .status(201)
        .send({ room, message: "Room already exists", isExist: true });
    } else {
      await Room.create(req.body);
      const room = await Room.findOne({ roomId }).populate(
        "user1 user2",
        "-password"
      );
      return res
        .status(201)
        .send({ room, message: "Room created", isExist: false });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- get one room ----
app.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    // Check if the room already exists
    const room = await Room.findOne({ roomId }).populate(
      "user1 user2",
      "-password"
    );
    if (room) {
      return res.status(201).send(room);
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- getAll rooms ----
app.get("/", async (req, res) => {
  try {
    const room = await Room.find({}).populate("user1 user2", "-password");
    return res.status(200).send(room);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- delete rooms ----
app.delete("/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(201).send({ message: "Room not found", status: false });
    } else {
      return res.status(201).send({ message: "Room deleted", status: true });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- update or block user ----
app.put("/block/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user1 user2", "-password");
    if (!room) {
      return res.status(201).send({ message: "Room not found", status: false });
    } else {
      return res
        .status(200)
        .send({ room, message: "Room Updated", status: true });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).send({ message: error.message });
  }
});

module.exports = app;
