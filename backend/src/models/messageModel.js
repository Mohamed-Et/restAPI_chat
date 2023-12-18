const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reaction: { type: String, required: true },
});

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  reactions: [reactionSchema], // Array of reactions (user and reaction)
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  chatType: { type: String, enum: ["individual", "group"], required: true },
  repliedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // Correct reference to Message model
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
