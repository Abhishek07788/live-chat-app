const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chat: { type: String, required: true },
    currentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isSeen: { type: Boolean, required: true },
    roomId: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
