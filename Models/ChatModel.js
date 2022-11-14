const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
    lastMessage: String,
    senderName: String,
    receiverName: String,
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
