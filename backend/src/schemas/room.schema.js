const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blocked: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
