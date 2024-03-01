const express = require("express");
const Message = require("../schemas/messages.schema");

const app = express.Router();

// -- create Message ----
app.post("/", async (req, res) => {
  try {
    const createMsg = await Message.create(req.body);
    const msg = await Message.findOne({ _id: createMsg._id }).populate([
      "currentUser",
    ]);
    return res.status(201).send(msg);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send(error);
  }
});

// -- get room Message ----
app.get("/:roomId", async (req, res) => {
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
    res.status(400).send(error);
  }
});

// -- getAll Message ----
app.get("/", async (req, res) => {
  try {
    const msg = await Message.find({}).populate("currentUser", "-password");
    return res.status(200).send(msg);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send(error);
  }
});

app.patch("/seen/:userId", async (req, res) => {
  try {
    await Message.updateMany(
      {
        currentUser: req.params.userId,
        isSeen: false,
      },
      {
        $set: { isSeen: true },
      }
    );
    res.status(200).send({ status: true, message: "Message Seen!" });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send(error);
  }
});

// -- getAll unSeen Messages ----
app.get("/unseen/:roomId", async (req, res) => {
  try {
    const count = await Message.countDocuments({
      roomId: req.params.roomId,
      isSeen: false,
    });
    res.status(200).send({ count });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send(error);
  }
});

// -- delete Message ----
app.delete("/:id", async (req, res) => {
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
    res.status(400).send(error);
  }
});

// -- update or block user ----
app.put("/seen/:id", async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("currentUser", "-password");
    if (!msg) {
      return res
        .status(201)
        .send({ message: "Message not found", status: false });
    } else {
      return res
        .status(200)
        .send({ msg, message: "Message Updated", status: true });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).send(error);
  }
});

module.exports = app;
