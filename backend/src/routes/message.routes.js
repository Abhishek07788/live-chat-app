const express = require("express");
const Message = require("../schemas/messages.schema");
const middleware = require("../middleware/middleware");

const app = express.Router();

// -- create Message ----
app.post("/", middleware, async (req, res) => {
  try {
    const createMsg = await Message.create(req.body);
    const msg = await Message.findOne({ _id: createMsg._id }).populate([
      "currentUser",
    ]);
    return res.status(201).send(msg);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- get room Message ----
app.get("/:roomId", middleware, async (req, res) => {
  const { roomId } = req.params;
  try {
    // Check if the Message already exists
    const msg = await Message.find({ roomId }).populate(
      "currentUser",
      "-password"
    );
    if (msg) {
      return res.status(201).send(msg);
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- getAll Message ----
app.get("/", middleware, async (req, res) => {
  try {
    const msg = await Message.find({}).populate("currentUser", "-password");
    return res.status(200).send(msg);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// --- seen the messages --
app.patch("/seen", middleware, async (req, res) => {
  const { userId, roomId } = req.body;
  try {
    await Message.updateMany(
      {
        currentUser: userId,
        roomId: roomId,
        isSeen: false,
      },
      {
        $set: { isSeen: true },
      }
    );
    const msg = await Message.find({ roomId }).populate(
      "currentUser",
      "-password"
    );
    if (msg) {
      return res
        .status(200)
        .send({ msg, status: true, message: "Message Seen!" });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- getAll unSeen Messages ----
app.post("/unseen/count", middleware, async (req, res) => {
  const { userId, roomId } = req.body;
  try {
    const count = await Message.countDocuments({
      roomId: roomId,
      currentUser: userId,
      isSeen: false,
    });
    const lastMsg = await Message.findOne({
      roomId: roomId,
    })
      .sort({ createdAt: -1 })
      .populate("currentUser", "-password");
    if (lastMsg) {
      return res.status(200).send({
        count,
        lastMsg,
        status: true,
        message: `${count} Messages Found!`,
      });
    } else {
      return res
        .status(200)
        .send({ count, lastMsg: {}, status: false, message: "No message" });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

// -- delete Message ----
app.delete("/:id", middleware, async (req, res) => {
  try {
    const deletedMsg = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMsg) {
      return res
        .status(201)
        .send({ message: "Message not found", status: false });
    } else {
      return res.status(201).send({ message: "Message deleted", status: true });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
});

module.exports = app;
